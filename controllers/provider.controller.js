const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');
const providerService = require('services/provider.service');

module.exports = {
	getAllproviders,
	createProvider,
	updateProviderStatus,
	editProvider,
};

function getAllproviders(req, res, next) {
	providerService
		.getAllproviders()
		.then(providersList => res.json(providersList))
		.catch(next);
}

function createProvider(req, res, next) {
	providerService
		.createProvider(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}

function updateProviderStatus(req, res, next) {
	providerService
		.updateProviderStatus(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}

function editProvider(req, res, next) {
	providerService
		.editProvider(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}
