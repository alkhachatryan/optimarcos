const mongoose = require('mongoose');
const faker = require('faker');
const Automobile = require('../../src/models/automobile.model');

const automobileOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.middleName(),
  brand: faker.name.middleName(),
  price: Math.floor(Math.random() * 10000) + 1,
  productionYear: Math.floor(Math.random() * new Date().getFullYear()) + 1,
};

const insertAutomobiles = async (automobiles) => {
  await Automobile.insertMany(automobiles);
};

const createAutomobiles = async (number) => {
  const automobilesToCreate = [];
  for (let i = 0; i < number; i += 1) {
    automobilesToCreate.push({ ...automobileOne, _id: mongoose.Types.ObjectId() });
  }
  await insertAutomobiles(automobilesToCreate);
};

module.exports = {
  automobileOne,
  insertAutomobiles,
  createAutomobiles,
};
