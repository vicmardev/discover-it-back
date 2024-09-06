const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const Role = require('helpers/role');

const discoveryController = require('controllers/discovery.controller');

router.get('/getTypePartsName', discoveryController.getTypePartsName);
router.get('/getChasis', discoveryController.getChasis);
router.get('/componentChasis/:id', discoveryController.getComponentsChasis);

module.exports = router;
