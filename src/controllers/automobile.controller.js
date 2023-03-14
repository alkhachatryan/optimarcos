const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { automobileService } = require('../services');

const create = catchAsync(async (req, res) => {
  const automobile = await automobileService.createAutomobile(req.body);
  res.status(httpStatus.OK).send(automobile);
});

const listAutomobiles = catchAsync(async (req, res) => {
  const automobiles = await automobileService.listAutomobiles(req.query);
  res.status(httpStatus.OK).send(automobiles);
});

module.exports = {
  create,
  listAutomobiles,
};
