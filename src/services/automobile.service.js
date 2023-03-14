const httpStatus = require('http-status');
const { Automobile} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a automobile
 * @param {Object} body
 * @returns {Promise<Automobile>}
 */
const createAutomobile = async (body) => {
  return Automobile.create(body);
};

/**
 * List all automobiles
 * @param {Object} query
 * @returns {Promise<Automobile>}
 */
const listAutomobiles = async (query) => {
  const { page, limit, sortBy, brand } = query;
  return Automobile.paginate({ brand }, { page, limit, sortBy });
};

module.exports = {
  createAutomobile,
  listAutomobiles,
};
