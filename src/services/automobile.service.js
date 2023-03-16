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
  const filter = brand ? { brand } : {};
  return Automobile.paginate(filter, { page, limit, sortBy });
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

/**
 * Update automobile by id
 * @param {ObjectId} automobileId
 * @param {object} body
 * @returns {Promise<Automobile>}
 */
const updateById = async (automobileId, body) => {
  const automobile = await Automobile.findById(automobileId);
  if (!automobile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Automobile not found');
  }

  Object.assign(automobile, body);
  await automobile.save();

  return automobile;
};

/**
 * Get automobile by id
 * @param {ObjectId} automobileId
 * @returns {Promise<Automobile>}
 */
const getById = async (automobileId) => {
  const automobile = await Automobile.findById(automobileId);
  if (!automobile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Automobile not found');
  }

  return automobile;
};

module.exports = {
  createAutomobile,
  listAutomobiles,
  deleteById,
  updateById,
  getById,
};
