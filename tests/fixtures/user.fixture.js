const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const request = require('supertest');
const httpStatus = require('http-status');
const User = require('../../src/models/user.model');
const app = require('../../src/app');
const { adminAccessToken } = require('./token.fixture');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

const loginAdmin = async () => {
  await insertUsers([admin]);
  const res = await request(app).post('/v1/auth/login').send({
    email: admin.email,
    password: admin.password,
  });

  return res.body;
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
  loginAdmin,
};
