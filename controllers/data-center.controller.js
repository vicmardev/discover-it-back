const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const dataCenterService = require('services/data-center.service');
const Role = require('helpers/role');

module.exports = {
	getAllDataCenters,
	getDataCenterById,
	getDataCentersByData,
};

function getAllDataCenters(req, res, next) {
	dataCenterService
		.getAllDataCenters()
		.then(dataCenterList => res.json(dataCenterList))
		.catch(next);
}

function getDataCenterById(req, res, next) {
	dataCenterService
		.getDataCenterById(req.params.id)
		.then(dataCenter => res.json(dataCenter))
		.catch(next);
}

function getDataCentersByData(req, res, next) {
	dataCenterService
		.getDataCentersByData(req.params.data)
		.then(dataCenter => res.json(dataCenter))
		.catch(next);
}
