const express = require('express');
const validate = require('../../middlewares/validate');
const automobileController = require('../../controllers/automobile.controller');
const auth = require('../../middlewares/auth');
const automobileValidation = require('../../validations/automobile.validation');

const router = express.Router();

router.post('/', auth(), validate(automobileValidation.createAutomobile), automobileController.create);
router.get('/', auth(), automobileController.listAutomobiles);
router.delete('/:automobileId', auth(), validate(automobileValidation.deleteAutomobile), automobileController.deleteAutomobile);
router.put('/:automobileId', auth(), validate(automobileValidation.updateAutomobile), automobileController.updateAutomobile);

module.exports = router;
