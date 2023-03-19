const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { automobileService } = require('../services');

const create = catchAsync(async (req, res) => {
  const automobile = await automobileService.createAutomobile(req.body);
  res.status(httpStatus.CREATED).send(automobile);
});

const listAutomobiles = catchAsync(async (req, res) => {
  const automobiles = await automobileService.listAutomobiles(req.query);
  res.status(httpStatus.OK).send(automobiles);
});

const deleteAutomobile = catchAsync(async (req, res) => {
  await automobileService.deleteById(req.params.automobileId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateAutomobile = catchAsync(async (req, res) => {
  const automobile = await automobileService.updateById(req.params.automobileId, req.body);
  res.status(httpStatus.OK).send(automobile);
});

const getAutomobile = catchAsync(async (req, res) => {
  const automobile = await automobileService.getById(req.params.automobileId);
  res.status(httpStatus.OK).send(automobile);
});

module.exports = {
  create,
  listAutomobiles,
  deleteAutomobile,
  updateAutomobile,
  getAutomobile,
};
