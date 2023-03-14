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

/**
 * Delete automobile by id
 * @param {ObjectId} automobileId
 */
const deleteById = async (automobileId) => {
  const automobile = await Automobile.findById(automobileId);
  if (automobile) {
    await automobile.remove();
  }
};

module.exports = {
  createAutomobile,
  listAutomobiles,
  deleteById,
};
