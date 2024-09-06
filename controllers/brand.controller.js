const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');
const brandService = require('services/brand.service');

module.exports = {
	getAllBrands,
	createBrand,
	updateBrandStatus,
	editBrand,
};

function getAllBrands(req, res, next) {
	brandService
		.getAllBrands()
		.then(brandList => res.json(brandList))
		.catch(next);
}

function createBrand(req, res, next) {
	brandService
		.createBrand(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}

function updateBrandStatus(req, res, next) {
	brandService
		.updateBrandStatus(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}

function editBrand(req, res, next) {
	brandService
		.editBrand(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}
