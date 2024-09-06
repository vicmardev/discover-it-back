const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const dataCenterController = require('controllers/data-center.controller');
const Role = require('helpers/role');

router.get('/getDataCenters', dataCenterController.getAllDataCenters);
router.get('/getDataCenterById/:id', dataCenterController.getDataCenterById);
router.get('/getDataCentersByData/:data', dataCenterController.getDataCentersByData);
module.exports = router;
