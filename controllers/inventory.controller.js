const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');
const inventoryService = require('services/inventory.service');
const os = require('os');
const tempDir = os.tmpdir();
const path = require('path');
const {ExcelValidationError} = require('../classes/error/ExcelValidationError');
const {func} = require('joi');

module.exports = {
	getAllEquipment,
	getInventoryById,
	createSchema,
	createDevice,
	updateSchema,
	updateInventory,
	deleteInventory,
	inventoryStatus,
	getAllInventoryUser,
	setContractStatus,
	aliasSchema,
	createEquipment,
	getStatusList,
	getAddressByCP,
	addMultiple,
	getAllInfoContract,
	getSupportOperators,
	getBudgetContracts,
	createBudget,
	getCurrency,
	getContractEngineers,
	setContractEngineers,
	searchContract,
	getClientById,
	tableBuilder,
	getContractEngineersById,
	deleteEngineer,
	getAvailableEngineers,
	getSlaById,
	getBrandById
};

function createEquipment(req, res, next) {
	inventoryService.createEquipment(req.body);
}

function addMultiple(req, res, next) {
	inventoryService.addMultiple(req.body.data, req.body.dataCenter, req.body.contractInfo);
}

function getAllInfoContract(req, res, next) {
	inventoryService
		.getAllInfoContract(req.params.idContract)
		.then(contract => res.json(contract))
		.catch(next);
}

function getStatusList(req, res, next) {
	inventoryService
		.getStatusList(req.query.section)
		.then(statusList => res.json(statusList))
		.catch(next);
}

function getAddressByCP(req, res, next) {
	inventoryService
		.getAddressByCP(req.query.cp)
		.then(adress => res.json(adress))
		.catch(next);
}

function getSlaById(req, res, next){
	inventoryService
	.getSlaById(req.params)
	.then(sla => res.json(sla))
	.catch(next)
}

function getBrandById(req, res, next){
	inventoryService
	.getBrandById(req.params)
	.then(brand => res.json(brand))
	.catch(next)
}

function getAllEquipment(req, res, next) {
	if (req.query.contract) {
		inventoryService
			.getInventoryByContract(req.query.contract)
			.then(equipmentList => res.json(equipmentList))
			.catch(next);
	} else {
		inventoryService
			.getAllInventory()
			.then(equipmentList => res.json(equipmentList))
			.catch(next);
	}
}

function getAllInventoryUser(req, res, next) {
	const valEmail = req.params.email;
	inventoryService
		.getAllInventoryUser(valEmail)
		.then(equipmentList => res.json(equipmentList))
		.catch(next);
}

function getInventoryById(req, res, next) {
	// users can get their own account and admins can get any account
	inventoryService
		.getInventoryById(req.params.id)
		.then(equipment => (equipment ? res.json(equipment) : res.sendStatus(404)))
		.catch(next);
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		Serial: Joi.string().required(),
		Brand: Joi.string().required(),
		City: Joi.string().required(),
		Address: Joi.string().required(),
		Contrato: Joi.string().required(),
		Equipment: Joi.string().required(),
		Model: Joi.string().required(),
		SLA: Joi.string().required(),
		ServiceTag: Joi.string().allow(''),
		Start: Joi.date().required(),
		End: Joi.date().required(),
	});
	validateRequest(req, next, schema);
}

function createDevice(req, res, next) {
	if (req.user.role !== Role.Admin) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	inventoryService
		.createDevice(req.body)
		.then(equipment => res.json(equipment))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schemaRules = {
		Serial: Joi.string().required(),
		Brand: Joi.string().required(),
		City: Joi.string().required(),
		Address: Joi.string().required(),
		Contrato: Joi.string().required(),
		Equipment: Joi.string().required(),
		Model: Joi.string().required(),
		SLA: Joi.string().required(),
		ServiceTag: Joi.string().allow(''),
		Start: Joi.date().required(),
		End: Joi.date().required(),
	};

	const schema = Joi.object(schemaRules);
	validateRequest(req, next, schema);
}

function updateInventory(req, res, next) {
	if (req.user.role !== Role.Admin) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	inventoryService
		.updateInventory(req.params.id, req.body)
		.then(equipment => res.json(equipment))
		.catch(next);
}

function deleteInventory(req, res, next) {
	// users can delete their own account and admins can delete any account
	if (req.user.role !== Role.Admin) {
		return res.status(401).json({message: 'Unauthorized'});
	}

	inventoryService
		.setInventoryStatus(req.params.id, 'Complete', req.params.comments, req.params.user)
		.then(() => res.json({message: 'Item deleted successfully'}))
		.catch(next);
}

function inventoryStatus(req, res, next) {
	// users can delete their own account and admins can delete any account
	if (req.user.role !== Role.Admin) {
		return res.status(401).json({message: 'Unauthorized'});
	}

	inventoryService
		.setInventoryStatus(req.params.id, req.params.status)
		.then(equipment => res.json(equipment))
		.catch(next);
}

function getClientById(req, res, next) {
	inventoryService
		.getClientById(req.params.id)
		.then(client => res.json(client))
		.catch(next);
}

function setContractStatus(req, res, next) {
	if (req.user.role !== Role.Admin) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	inventoryService
		.setContractStatus(req.params.id, req.params.status, req.body)
		.then(equipment => res.json(equipment))
		.catch(next);
}

function aliasSchema(req, res, next) {
	const schemaRules = {
		Contrato: Joi.string().required(),
		Alias: Joi.string().required().allow(null, ''),
	};

	const schema = Joi.object(schemaRules);
	validateRequest(req, next, schema);
}

//New methods for Inventory Dialog (Add Budget)

function getSupportOperators(req, res, next) {
	inventoryService
		.getSupportOperators()
		.then(operators => res.json(operators))
		.catch(next);
}

function getBudgetContracts(req, res, next) {
	inventoryService
		.getBudgetContracts()
		.then(budgets => res.json(budgets))
		.catch(next);
}

function createBudget(req, res, next) {
	inventoryService
		.createBudget(req.body)
		.then(budget => res.json(budget))
		.catch(next);
}

function getCurrency(req, res, next) {
	inventoryService
		.getCurrency()
		.then(currencyList => res.json(currencyList))
		.catch(next);
}

function getContractEngineers(req, res, next) {
	inventoryService
		.getContractEngineers()
		.then(engineers => res.json(engineers))
		.catch(next);
}

function setContractEngineers(req, res, next) {
	inventoryService
		.setContractEngineers(req.body)
		.then(contract => res.json(contract))
		.catch(next);
}

function searchContract(req, res, next) {
	inventoryService
		.searchContract(req.params.IdContract)
		.then(contract => res.json(contract))
		.catch(next);
}

function tableBuilder(req, res, next) {
	inventoryService
		.tableBuilder()
		.then(contract => res.json(contract))
		.catch(next);
}

function getContractEngineersById(req, res, next) {
	inventoryService
		.getContractEngineersById(req.params.IdContract)
		.then(engineers => res.json(engineers))
		.catch(next);
}

function deleteEngineer(req, res, next) {
	inventoryService
		.deleteEngineer(req.params)
		.then(engineer => res.json(engineer))
		.catch(next);
}

function getAvailableEngineers(req, res, next) {
	console.log(req.body);
	inventoryService
		.getAvailableEngineers(req.body)
		.then(engineer => res.json(engineer))
		.catch(next);
}
