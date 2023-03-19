const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Automobile } = require('../../src/models');
const { adminAccessToken } = require('../fixtures/token.fixture');
const { createAutomobiles } = require('../fixtures/automobile.fixture');
const mongoose = require("mongoose");

setupTestDB();

describe('Automobile routes', () => {
  describe('POST /v1/automobiles', () => {
    const newAutomobile = {};
    const newAutomobileMockUp = {
      name: faker.name.middleName(),
      brand: faker.name.middleName(),
      price: Math.floor(Math.random() * 10000) + 1,
      productionYear: Math.floor(Math.random() * new Date().getFullYear()) + 1,
    };

    beforeEach(() => {
      Object.assign(newAutomobile, newAutomobileMockUp);
    });

    test('should return 201 and successfully create new automobile if data is ok', async () => {
      const res = await request(app)
        .post('/v1/automobiles')
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send(newAutomobile)
        .expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        id: expect.anything(),
        name: newAutomobile.name,
        brand: newAutomobile.brand,
        price: newAutomobile.price,
        productionYear: newAutomobile.productionYear,
      });

      const dbAutomobile = await Automobile.findById(res.body.id);
      expect(dbAutomobile).toBeDefined();
      expect(dbAutomobile).toMatchObject(newAutomobileMockUp);
    });

    test('should return 400 and validation error if data is not ok', async () => {
      newAutomobile.productionYear = new Date().getFullYear() + 1;

      await request(app)
        .post('/v1/automobiles')
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send(newAutomobile)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 401 and auth error if not logged in', async () => {
      await request(app).post('/v1/automobiles').send(newAutomobile).expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /v1/automobiles', () => {
    test('should return 200 and the list of automobiles', async () => {
      const automobilesToCreate = 50;
      await createAutomobiles(automobilesToCreate);

      const res = await request(app)
        .get('/v1/automobiles')
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send()
        .expect(httpStatus.OK);

      expect('page' in res.body).toEqual(true);
      expect('limit' in res.body).toEqual(true);
      expect('totalPages' in res.body).toEqual(true);
      expect('totalResults' in res.body).toEqual(true);
      expect(res.body.totalResults).toEqual(automobilesToCreate);
    });

    test('should return 200 and the nth page of list of automobiles', async () => {
      const automobilesToCreate = 20;
      const pageToNavigate = 2;
      await createAutomobiles(automobilesToCreate);

      const res = await request(app)
        .get(`/v1/automobiles?page=${pageToNavigate}`)
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body.page).toEqual(pageToNavigate);
    });

    test('should return 200 and set a new limit of list of automobiles', async () => {
      const automobilesToCreate = 20;
      const limitToSet = 5;
      await createAutomobiles(automobilesToCreate);

      const res = await request(app)
        .get(`/v1/automobiles?limit=${limitToSet}`)
        .set('Authorization', `Bearer ${await adminAccessToken()}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body.limit).toEqual(limitToSet);
    });
  });

  describe('PUT /v1/automobiles', () => {
    const newAutomobile = {
      name: faker.name.middleName(),
      brand: faker.name.middleName(),
      price: Math.floor(Math.random() * 10000) + 1,
      productionYear: Math.floor(Math.random() * new Date().getFullYear()) + 1,
    };

    test('should return 200 and data of successfully updated automobile', async () => {
      const adminUserAccessToken = await adminAccessToken();
      const res = await request(app)
        .post(`/v1/automobiles`)
        .set('Authorization', `Bearer ${adminUserAccessToken}`)
        .send(newAutomobile)
        .expect(httpStatus.CREATED);

      const createdAutomobile = res.body;
      const updatedAutomobile = await request(app)
        .put(`/v1/automobiles/${createdAutomobile.id}`)
        .set('Authorization', `Bearer ${adminUserAccessToken}`)
        .send(newAutomobile)
        .expect(httpStatus.OK);

      expect(createdAutomobile).toEqual(updatedAutomobile.body);
    });

    test('should return 400 and validation error when invalid data sent', async () => {
      const adminUserAccessToken = await adminAccessToken();
      const res = await request(app)
        .post(`/v1/automobiles`)
        .set('Authorization', `Bearer ${adminUserAccessToken}`)
        .send(newAutomobile)
        .expect(httpStatus.CREATED);

      const createdAutomobile = res.body;
      newAutomobile.productionYear = new Date().getFullYear() + 1;
      await request(app)
        .put(`/v1/automobiles/${createdAutomobile.id}`)
        .set('Authorization', `Bearer ${adminUserAccessToken}`)
        .send(newAutomobile)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('DELETE /v1/automobiles', () => {
    const newAutomobile = {
      name: faker.name.middleName(),
      brand: faker.name.middleName(),
      price: Math.floor(Math.random() * 10000) + 1,
      productionYear: Math.floor(Math.random() * new Date().getFullYear()) + 1,
    };

    test('should return 204 when successfully deleted', async () => {
      const adminUserAccessToken = await adminAccessToken();
      const res = await request(app)
        .post(`/v1/automobiles`)
        .set('Authorization', `Bearer ${adminUserAccessToken}`)
        .send(newAutomobile)
        .expect(httpStatus.CREATED);

      await request(app)
        .delete(`/v1/automobiles/${res.body.id}`)
        .set('Authorization', `Bearer ${adminUserAccessToken}`)
        .send()
        .expect(httpStatus.NO_CONTENT);

      const dbAutomobile = await Automobile.findById(res.body.id);
      expect(dbAutomobile).toBeNull();
    });
  });
});
