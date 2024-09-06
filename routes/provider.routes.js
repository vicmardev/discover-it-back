const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const providerController = require('controllers/provider.controller');

router.get('/getAllproviders', providerController.getAllproviders);
router.post('/createProvider', providerController.createProvider);
router.put('/updateProviderStatus', providerController.updateProviderStatus);
router.put('/editProvider', providerController.editProvider);

module.exports = router;
