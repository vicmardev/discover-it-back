const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const brandController = require('controllers/brand.controller');

router.get('/getAllBrands', brandController.getAllBrands);
router.post('/createBrand', brandController.createBrand);
router.put('/updateBrandStatus', brandController.updateBrandStatus);
router.put('/editBrand', brandController.editBrand);

module.exports = router;
