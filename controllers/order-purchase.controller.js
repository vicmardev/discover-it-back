const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');
const orderService = require('services/order-purchase.service');
const os = require('os');
const tempDir = os.tmpdir();
const path = require('path');

module.exports = {
	createOrder,
	getAllOrders,
	getBrands,
	getTypeParts,
	updateOrder,
	deleteOrder,
	editOrder,
	getHistory,
};

function createOrder(req, res, next) {
	orderService
		.createOrder(req.body, req.files.UrlOrderFile)
		.then(order => res.json(order))
		.catch(next);
}

function updateOrder(req, res, next) {
	orderService
		.updateOrder(req.body)
		.then(order => res.json(order))
		.catch(next);
}

function editOrder(req, res, next) {
	orderService
		.editOrder(req.body)
		.then(order => res.json(order))
		.catch(next);
}

function deleteOrder(req, res, next) {
	orderService
		.deleteOrder(req.body)
		.then(order => res.json(order))
		.catch(next);
}
function getAllOrders(req, res, next) {
	if (req.query.filePath) {
		let filePath = req.query.filePath.toString();
		const file = path.resolve(filePath);
		res.download(filePath, file);
	} else {
		orderService
			.getAllOrders()
			.then(ordersList => res.json(ordersList))
			.catch(next);
	}
}
function getHistory(req, res, next) {
	const numOrder = req.params.numOrder;
	orderService
		.getHistory(numOrder)
		.then(historyList => res.json(historyList))
		.catch(next);
}
function getBrands(req, res, next) {
	orderService
		.getBrands()
		.then(brandsList => res.json(brandsList))
		.catch(next);
}

function getTypeParts(req, res, next) {
	orderService
		.getTypeParts()
		.then(typeList => res.json(typeList))
		.catch(next);
}
