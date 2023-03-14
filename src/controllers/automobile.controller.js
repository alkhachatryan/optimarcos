const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { automobileService } = require('../services');

const create = catchAsync(async (req, res) => {
  const automobile = await automobileService.createAutomobile(req.body);
  res.status(httpStatus.OK).send(automobile);
});

module.exports = {
  create,
};
