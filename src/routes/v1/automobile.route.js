const express = require('express');
const validate = require('../../middlewares/validate');
const automobileController = require('../../controllers/automobile.controller');
const auth = require('../../middlewares/auth');
const automobileValidation = require('../../validations/automobile.validation')

const router = express.Router();

router.post('/', auth(), validate(automobileValidation.createAutomobile), automobileController.create);

module.exports = router;
