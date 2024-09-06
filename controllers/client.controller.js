const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const clientService = require('services/client.service');
const Role = require('helpers/role');

module.exports = {
	getAllClients,
	createClient,
	updateClientStatus,
	editClient,
};

function getAllClients(req, res, next) {
	clientService
		.getAllClients()
		.then(clientList => res.json(clientList))
		.catch(next);
}

function createClient(req, res, next) {
	clientService
		.createClient(req.body)
		.then(client => res.json(client))
		.catch(next);
}

/* function updateClientStatus(req, res, next) {
	clientService
		.updateClientStatus(req.params.id, req.body)
		.then(client => res.json(client))
		.catch(next);
} */

function updateClientStatus(req, res, next) {
	clientService
		.updateClientStatus(req.body)
		.then(client => res.json(client))
		.catch(next);
}

function editClient(req, res, next) {
	clientService
		.editClient(req.body)
		.then(operator => res.json(operator))
		.catch(next);
}
