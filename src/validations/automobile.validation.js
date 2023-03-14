const Joi = require('joi');

const createAutomobile = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    productionYear: Joi.number().integer().max(new Date().getFullYear()).required(),
    price: Joi.number().min(1).required(),
  }),
};

module.exports = {
  createAutomobile
};
