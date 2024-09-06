const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const SupportOperatorService = require('services/support-operator.service');
const Role = require('helpers/role');

module.exports = {
	getAllOperators,
	createSupportOperator,
	updateOperatorStatus,
	getNameLevel,
	editOperator,
};

function getAllOperators(req, res, next) {
	SupportOperatorService.getAllOperators()
		.then(operatorList => res.json(operatorList))
		.catch(next);
}

function createSupportOperator(req, res, next) {
	SupportOperatorService.createOperator(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}

function updateOperatorStatus(req, res, next) {
	SupportOperatorService.updateOperatorStatus(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}

function getNameLevel(req, res, next) {
	SupportOperatorService.getNameLevel()
		.then(levelList => res.json(levelList))
		.catch(next);
}

function editOperator(req, res, next) {
	console.log('Valor de params c', req.body);
	SupportOperatorService.editOperator(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}
