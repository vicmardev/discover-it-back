const {json} = require('body-parser');
const config = require('config.json');
const db = require('database/db');
const Role = require('helpers/role');
const readXlsxFile = require('read-excel-file/node');
const token = 'Z^M%pK2R8Xg&ZJhY';
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const Request = require('request');
const https = require('https');
const dataCenterService = require('services/data-center.service');
const ContractExcelModel = require('../models/excel/contract.model');
const EquipmentExcelModel = require('../models/excel/equipment.model');
const {BaseError, Op} = require('sequelize');
const {ExcelValidationError} = require('../classes/error/ExcelValidationError');
const DataCenterModel = require('../models/createContract/dataCenter.model');

module.exports = {
	authorize,
	getInventoryByContract,
	getInventoryById,
	getContractInfo,
	createDevice,
	updateInventory,
	//setInventoryStatus,
	getAllInventoryUser,
	setContractStatus,
	setContractAlias,
	//createEquipment,
	//getRowsFromFile,
	//importContracts,
	getStatusList,
	getAddressByCP,
	addMultiple,
	getAllInfoContract,
	getEquipmentOfDataCenter,
	getAllSLAs,
	getAllProviders,
	updateContractAlias,
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
//https://sequelize.org/docs/v6/other-topics/transactions/
//https://www.tutofox.com/nodejs/nodejs-express-sequelize-crud/

async function transformDate(date) {
	date = new Date(date);
	let day = date.getDate();
	if (day < 10) {
		day = '0' + day;
	}
	let month = date.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}
	let year = date.getFullYear();
	date = year + '' + month + '' + day;
	return date;
}
async function addMultiple(equipments, dataCenter, contractInfo) {
	const dataCenterData = await dataCenterService.getDataCentersByData(dataCenter);
	let schemaTest = DataCenterModel;
	schemaTest = {
		IdContract: contractInfo.IdContract,
		IdCity: dataCenterData.IdCity,
		IdCountry: dataCenterData.IdCountry,
		Delegation: dataCenterData.Delegation,
		Neighborhood: dataCenterData.Neighborhood,
		PostalCode: dataCenterData.PostalCode,
		Street: dataCenterData.Street,
		InternalNumber: dataCenterData.InternalNumber,
		ExternalNumber: dataCenterData.ExternalNumber,
		DataCenter: dataCenterData.DataCenter,
	};
	const dataCenterSave = await models.DataCenter.create({...schemaTest});

	const t = await sequelize.transaction();

	try {
		for (let equipment of equipments) {
			let existingBrand = await getObjectFromCollection(
				'Brand',
				{
					NameBrand: equipment.brand,
				},
				t
			);
			equipment.IdBrand = existingBrand.IdBrand;

			let existingIdTypePart = await getObjectFromCollection(
				'TypePart',
				{
					Name: equipment.equipment,
				},
				t
			);
			equipment.IdTypePart = existingIdTypePart.IdTypePart;
			let existingProvider = await getObjectFromCollection(
				'Provider',
				{
					Name: equipment.hardwareProvider,
				},
				t
			);
			equipment.IdProvider = existingProvider.IdProvider;

			let existingDataCenter = await models.DataCenter.findOne({
				where: {DataCenter: equipment.dataCenter},
				transaction: t,
			});

			if (!existingDataCenter) {
				throw new Error(`No existe el DataCenter ${equipment.dataCenter}`);
			}

			//Verify if serial equipment exist
			let existingEquipment = await models.Equipment.findOne({
				where: {Serial: equipment.Serial, Model: equipment.Model},
				transaction: t,
			});

			if (!existingEquipment) {
				existingEquipment = await models.Equipment.create(equipment, {transaction: t});
			} else {
				if (existingEquipment.changed()) {
					await existingEquipment.save({transaction: t});
				}
			}
			const relationCenterEquip = {
				IdDataCenter: dataCenterSave.IdDataCenter,
				IdEquipment: existingEquipment.IdEquipment,
			};

			let exisitingRelationCenterEquipment = await models.DataCenterEquipment.findOne({
				where: relationCenterEquip,
				transaction: t,
			});
			if (equipment && equipment.SLA) {
				const existingSLA = await models.SLA.findOne({
					where: {Name: equipment.SLA},
					transaction: t,
				});
				if (!existingSLA) {
					throw new Error(`El SLA '${equipment.SLA}' no existe`);
				}
				relationCenterEquip.IdSLA = existingSLA.IdSLA;
			}
			if(equipment && equipment.contractTime){
				const existingContractTime = await models.ContractTime.findOne({
					where: {Duration: equipment.contractTime},
					transaction: t,
				});
				if(!existingContractTime){
					throw new Error(`El Tiempo de contrato'${equipment.contractTime}' no existe`)
				}
				relationCenterEquip.IdContractTime = existingContractTime.IdContractTime;
			}
			if (!exisitingRelationCenterEquipment) {
				await models.DataCenterEquipment.create(relationCenterEquip, {
					transaction: t,
				});
			}
		}
		await t.commit();
	} catch (error) {
		console.log(error);
		await t.rollback;
	}
}

async function getObjectFromCollection(collection, whereQuery, t) {
	let object = await models[collection].findOne({
		where: whereQuery,
		transaction: t,
	});
	if (!object) {
		throw new Error(`error in query ${object}`);
	}
	return object;
}

async function getAllInfoContract(idContractOne) {
	return await models.Contract.findOne({
		where: {
			Contract: idContractOne,
		},
		attributes: {
			exclude: ['updatedAt','IdContractTime'],
			include: [
				[
					sequelize.literal(
						'(SELECT Name FROM Clients WHERE Clients.IdClient = Contract.IdClient)'
					),
					'ClientName',
				],
				[
					sequelize.literal(
						'(SELECT NumOrder FROM OrderPurchase WHERE OrderPurchase.IdOrder = Contract.IdOrder)'
					),
					'NumberOrder',
				],
				[
					sequelize.literal(
						'(SELECT COUNT(*) FROM DataCenters WHERE DataCenters.IdContract = Contract.IdContract )'
					),
					'DataCentersCount',
				],
			],
		},

		include: [
			{
				model: models.DataCenter,
				as: 'DataCenters',
				attributes: {
					exclude: ['IdContract','IdCity','IdCountry','Delegation',
					'PostalCode','Street','InternalNumber','ExternalNumber',
					'Neighborhood','Latitud','Longitud','createdAt','updatedAt','DataCenter'],
				},
				include: [
					{
						model: models.DataCenterEquipment,
						as: 'DataCenterEquipment',
						//attributes:{
							include:[
								{
									model: models.Equipment,
									as: 'Equipments',
								}
							],
							/*
							include:[
								[
									sequelize.literal(
										'(SELECT Duration FROM ContractTime WHERE ContractTime.IdContractTime = DataCenterEquipment.IdContractTime)'
									),
									'ContractTime',
								]
							]*/
						//}
					},
					/*
					{
						model: models.Equipment,
						as: 'Equipments',
						include: [
							{
								model: models.Provider,
								as: 'Provider',
								attributes: {
									exclude: [
										'NameContact',
										'PhoneContact',
										'EmailContact',
										'City',
										'Country',
										'Delegation',
										'PostalCode',
										'InternalNumber',
										'ExternalNumber',
										'Comments',
										'updatedAt',
										'Status',
									],
								},
							},
							{
								model: models.Brand,
								as: 'Brand',
								attributes: {
									exclude: ['Status', 'Description', 'updatedAt'],
								},
							},
							{
								model: models.TypePart,
								as: 'TypePart',
								attributes: {
									exclude: ['Status', 'Description', 'createdAt', 'updatedAt'],
								},
							},
						],
					},*/

				],
			},
		],

	});
}

async function getEquipmentOfDataCenter(idDataCenter) {
	const dataCenter = await models.DataCenter.findOne({
		where: {IdDataCenter: idDataCenter},
		include: [
			{
				model: models.Equipment,
				as: 'Equipments',
				attributes: {
					exclude: ['createdAt', 'updatedAt'],
					include: [
						[
							sequelize.literal(
								'(SELECT NameBrand FROM Brands where Brands.IdBrand=Equipments.IdBrand)'
							),
							'NameBrand',
						],
						[
							sequelize.literal(
								'(SELECT Name FROM TypeParts where TypeParts.IdTypePart=Equipments.IdTypePart)'
							),
							'TypePartName',
						],
						[
							sequelize.literal(
								'(SELECT Name FROM Providers where Providers.IdProvider=Equipments.IdProvider)'
							),
							'ProviderName',
						],
					],
				},
				order: [['TypePartName', 'ASC']],
			},
		],
	});

	return dataCenter ? dataCenter.Equipments : null;
}

async function getAllSLAs() {
	return await models.SLA.findAll({});
}

async function getAllProviders() {
	return await models.Provider.findAll({});
}

function getStatusList(req, res, next) {
	inventoryService
		.getStatusList(req.query.section)
		.then(statusList => res.json(statusList))
		.catch(next);
}

async function getStatusList(section) {
	const statusList = await models.GeneralStatus.findAll({
		where: {
			Dashboard: section,
		},
		attributes: ['IdStatus', 'Status'],
	});
	return statusList;
}

async function getAddressByCP(cp) {
	const requestAddress = 'https://apisgratis.com/cp/colonias/cp/?valor=' + cp;
	let completeAddress = Request.get(requestAddress, (error, response, body) => {
		if (error) {
			return console.dir(error);
		}
		return body;
	});
}

async function getContractInfo(usrId) {
	const contractList = await models.Inventory.findAll({
		raw: true,
		group: ['Contract'],
		attributes: [
			['Contract', '_id'],
			'Contract',
			'Alias',
			'Status',
			[sequelize.fn('COUNT', sequelize.col('Contract')), 'Count'],
			[sequelize.fn('MIN', sequelize.col('StartContract')), 'Start'],
			[sequelize.fn('MAX', sequelize.col('EndContract')), 'End'],
		],
		order: [[sequelize.col('Count'), 'DESC']],
	});

	if (!contractList) throw `Contract not found`;
	return contractList;
}

async function getInventoryByContract(contract) {
	const equipment = await models.Inventory.findAll({
		raw: true,
		where: [{Contract: contract}],
		attributes: [
			['Contract', '_id'],
			'Contract',
			'SerialProvider',
			'Alias',
			'Status',
			'Serial',
			'Brand',
			'SLA',
		],
	});

	if (!equipment) throw 'Equipment not found';
	return equipment;
}

async function getInventoryById(id) {
	if (!db.isValidId(id)) throw 'Equipment not found';
	const equipment = await db.Equipment.findById(id);
	if (!equipment) throw 'Equipment not found';
	return equipment;
}

async function createDevice(params) {
	// validate
	if (await db.Equipment.findOne({Serial: params.serial})) {
		throw 'Serial number "' + params.serial + '" is already registered';
	}
	params.Status = 'Active';
	const equipment = new db.Equipment(params);

	// save equipment
	await equipment.save();

	return basicDetails(equipment);
}

async function updateInventory(id, params) {
	const equipment = await getInventoryById(id);

	// copy params to account and save
	Object.assign(equipment, params);
	await equipment.save();

	return basicDetails(equipment);
}

async function setContractStatus(contract, status, body) {
	const equipment = models.Inventory.findAll({
		where: {
			Contract: contract,
		},
	});
	if (!equipment) {
		throw 'No contract found';
	} else {
		const equipmentU = models.Inventory.update(
			{
				Status: status,
			},
			{
				where: {
					Contract: contract,
				},
			}
		);
		return equipmentU;
	}
}

async function getClientById(id) {
	const client = await models.Client.findOne({
		where: {
			IdClient: id,
		},
		attributes: ['IdClient', 'Name', 'RegisteredName', 'AdressFiscal', 'RFC'],
	});
	return client;
}

async function getSlaById(params){
	const sla = await models.SLA.findOne({
		where: {
			IdSLA: params.id
		},
		attributes: ['IdSLA', 'Name', 'Description']
	});
	return sla
}

async function getBrandById(params){
	const brand = await models.Brand.findOne({
		where: {
			IdBrand: params.id
		},
		attributes: ['IdBrand', 'NameBrand']
	});
	return brand
}

async function setContractAlias(contract, account, alias) {
	const device = await models.Inventory.findAll({Contract: contract});
	if (!device) {
		throw 'No contract found';
	} else {
		const equipmentU = models.Inventory.update(
			{
				Alias: alias,
			},
			{
				where: {
					Contract: contract,
				},
			}
		);
		return equipmentU;
	}
}

async function getAllInventoryUser(correo) {
	try {
		let user = await db.Account.findOne({email: correo});
		const salida = await db.Account.find({email: correo}).distinct('contrato');

		let query = await models.Inventory.findAll({
			raw: true,
			where: {
				Contract: {[sequelize.in]: salida},
			},
			group: ['Contract'],
			attributes: [
				['Contract', '_id'],
				['Contract', 'Contrato'],
				'Alias',
				'Status',
				[sequelize.fn('COUNT', sequelize.col('Contract')), 'Count'],
				[sequelize.fn('MIN', sequelize.col('StartContract')), 'Start'],
				[sequelize.fn('MAX', sequelize.col('EndContract')), 'End'],
			],
			order: [[sequelize.col('Count'), 'DESC']],
		});

		for (let i = 0; i < query.length; i++) {
			let contract = query[i];
			let alias = await getContractAlias(contract.Contrato, user._id);
			if (!alias) continue;
			contract.Alias = alias.Alias;
		}
		return query;
	} catch (error) {
		throw error;
	}
}

async function getContractAlias(contract, usrId) {
	const alias = await db.ContractAlias.findOne({Contrato: contract});
	return alias;
}

function basicDetails(equipment) {
	const {
		id,
		Serial,
		Brand,
		City,
		Address,
		Contrato,
		Equipment,
		Model,
		SLA,
		ServiceTag,
		Start,
		End,
		Status,
	} = equipment;
	return {
		id,
		Serial,
		Brand,
		City,
		Address,
		Contrato,
		Equipment,
		Model,
		SLA,
		ServiceTag,
		Start,
		End,
		Status,
	};
}

function authorize(token_provided) {
	return token_provided === token ? true : false;
}

async function updateContractAlias(idContract, contract) {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await models.Contract.update(contract, {
			where: {
				idContract: idContract,
			},
			//logging: console.log,
		});
		result.status = true;
	} catch (e) {
		if (e instanceof BaseError) {
			result.msg = e.parent.text;
		} else {
			throw e;
		}
	}
	return result;
}

async function getGeoLocationOfAddresses() {
	const addresses = await models.AddressInventory.findAll({
		group: [
			'Country',
			'City',
			'Delegation',
			'Neighborhood',
			'PostalCode',
			'Street',
			'InternalNumber',
			'ExternalNumber',
		],
	});

	const options = {
		hostname: 'https://nominatim.openstreetmap.org/',
		path: '/todos',
		method: 'GET',
	};

	const req = https.request(options, res => {
		console.log(`statusCode: ${res.statusCode}`);

		res.on('data', d => {
			process.stdout.write(d);
		});
	});

	req.on('error', error => {
		console.error(error);
	});

	req.end();
}

//New methods for Inventory Dialog (Add Budget)
async function getSupportOperators() {
	operators = await models.SupportOperator.findAll({
		attributes: ['IdSupportOPerators', 'Name'],
	});
	return operators;
}

async function getBudgetContracts() {
	budget = await models.BudgetContract.findAll();
	return budget;
}

async function createBudget(req) {
	try {
		const budget = await models.BudgetContract.create({
			IdContract: req.IdContract,
			IdUser: req.IdUser,
			Budget: req.Budget,
			Description: req.Description,
			BudgetHR: req.BudgetHR,
			BudgetProviders: req.BudgetProviders,
			IdCurrency: req.Currency,
		});

		for (let i = 0; i < req.Engineers.length; i++) {
			let query = {
				IdContract: req.IdContract,
				IdEngineer: req.Engineers[i],
			};
			this.setContractEngineers(query);
		}
		return budget;
	} catch (error) {
		throw error;
	}
}

async function searchContract(IdContract) {
	let queryBudget = await models.BudgetContract.findAll({
		where: {
			IdContract: IdContract,
		},
		attributes: {
			include: [
				[
					sequelize.literal(
						'(SELECT CurrencyCode FROM CurrencyList Where CurrencyList.IdCurrency=BudgetContract.IdCurrency)'
					),
					'CurrencyName',
				],
			],
		},
	});

	let queryOperator = await this.getContractEngineersById(IdContract);
	const query = {
		budget: queryBudget,
		operators: queryOperator,
	};
	return query;
}

async function getCurrency() {
	currencyList = await models.CurrencyList.findAll({
		where: {
			Status: 1,
		},
	});
	return currencyList;
}

async function getContractEngineers() {
	engineers = await models.ContractEngineer.findAll();
	return engineers;
}

async function getContractEngineersById(IdContract) {
	engineers = await models.ContractEngineer.findAll({
		where: {
			IdContract: IdContract,
		},
		attributes: {
			include: [
				[
					sequelize.literal(
						'(SELECT Name FROM supportOperators Where supportOperators.IdSupportOPerators=ContractEngineer.IdEngineer)'
					),
					'Name',
				],
			],
		},
	});
	return engineers;
}

async function setContractEngineers(req) {
	try {
		const contract = await models.ContractEngineer.create({
			IdContract: req.IdContract,
			IdEngineer: req.IdEngineer,
		});
		return contract;
	} catch (error) {
		throw error;
	}
}

async function tableBuilder() {
	const query = await sequelize.query('SELECT * FROM ContractDetailsV', {
		type: sequelize.QueryTypes.SELECT,
	});
	return query;
}

async function deleteEngineer(req) {
	const query = await models.ContractEngineer.destroy({
		where: {
			IdEngineer: req.IdEngineer,
			IdContract: req.IdContract,
		},
	});
	return query;
}

async function engineersEnable() {
	const engineersList = [3];
	console.log(engineersList);
	const queryStatus = await models.ContractEngineer.findAll({
		include: [
			{
				model: models.SupportOperator,
				as: 'ce',
				where: {
					IdSupportOPerators: {[Op.notIn]: [2]},
				},
			},
		],
	});
	console.log(queryStatus);
	return queryStatus;
}

async function getAvailableEngineers(req) {
	//let list = JSON.parse(req.unavailable);
	console.log(req);
	availableEngineers = await models.SupportOperator.findAll({
		attributes: ['IdSupportOperators', 'Name'],
		where: {
			IdSupportOPerators: {[Op.notIn]: req},
		},
	});
	return availableEngineers;
}

//SerialProvider
//Prolongacion Paseo de la Reforma 5396, La Rosita, El Yaqui, Cuajimalpa de Morelos, 05000 Ciudad de México, CDMX
//Alfonso Nápoles Gándara 50, Peña Blanca, Álvaro Obregón 1210, Mexico
