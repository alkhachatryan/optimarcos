const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAutomobile = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    productionYear: Joi.number().integer().max(new Date().getFullYear()).required(),
    price: Joi.number().min(1).required(),
  }),
};

const deleteAutomobile = {
  param: Joi.object().keys({
    automobileId: Joi.required().custom(objectId),
  }),
};

const updateAutomobile = {
  param: Joi.object().keys({
    automobileId: Joi.required().custom(objectId),
  }),
  ...createAutomobile,
};

module.exports = {
  createAutomobile,
  deleteAutomobile,
  updateAutomobile,
};
