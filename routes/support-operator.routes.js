const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const SupportOperatorController = require('controllers/support-operator.controller');
const Role = require('helpers/role');

router.get('/support', SupportOperatorController.getAllOperators);
router.post('/createSupportOperator', SupportOperatorController.createSupportOperator);
router.put('/updateOperatorStatus', SupportOperatorController.updateOperatorStatus);
router.get('/getNameLevel', SupportOperatorController.getNameLevel);
router.put('/editOperator', SupportOperatorController.editOperator);

module.exports = router;
