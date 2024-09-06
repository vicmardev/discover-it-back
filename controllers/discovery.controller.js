const express = require('express');
const discoveryService = require('services/discovery.service');

module.exports = {
	getTypePartsName,
	getChasis,
	getComponentsChasis,
};

function getTypePartsName(req, res, next) {
	discoveryService
		.getTypePartsName()
		.then(msg => res.json(msg))
		.catch(next);
}

function getChasis(req, res, next) {
	console.log(req.query);
	discoveryService
		.getChasis(req.query)
		.then(chasisList => res.json(chasisList))
		.catch(next);
}

function getComponentsChasis(req, res, next) {
	discoveryService
		.getComponentsChasis(req)
		.then(componentList => res.json(componentList))
		.catch(next);
}
