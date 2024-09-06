const db = require('database/db');
const fs = require('fs');
const clientService = require('services/client.service');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const readXlsxFile = require('read-excel-file/node');
const ContractExcelModel = require('../models/excel/contract.model');
const EquipmentExcelModel = require('../models/excel/equipment.model');
const {ExcelValidationError} = require('../classes/error/ExcelValidationError');
const crypto = require('crypto');
const archiver = require('archiver');

/*
const postResponse = async (params, files) => {
	console.log('Entro a postResponse');
	var generalPath = '';
	if (files) {
		let file = files;
		let fileDir = `uploads/contracts`;
		let filePath = `${fileDir}/${params.contractNumber}.zip`;
		params.pathZip = filePath;
		generalPath = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});
	}
	try {
		let where = {contractNumber: params.contractNumber};
		let operation = {
			$set: {
				pathZip: generalPath,
			},
		};
		const query = await db.Contract.updateOne(where, operation, {multi: true});
		return query;
	} catch (error) {
		throw error;
	}
};*/

const saveContractZip = async (params, files)=>{
	console.log('Entro a saveContract');
	var generalPath = '';
	if (files) {
		
		let file = files;
		let fileDir = `uploads/contracts`;
		let filePath = `${fileDir}/${params.NameContract}.zip`;
		params.pathZip = filePath;
		generalPath = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
			console.log('Entro aqui');
		}
		//await encriptZip(filePath);
		console.log('Entro aqui de else', filePath);
		fs.writeFile(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});
		encriptZip(filePath);
	}
}

async function encriptZip(filePath){
	console.log('Entro a encriptZip', filePath);
	archiver.registerFormat('zip-encrypted', require("archiver-zip-encrypted"));
	let archive = archiver.create('zip-encrypted', { zlib: {level: 8},encryptionMethod:'aes256', password:'12345'});
	archive.append(filePath, {name: 'Test de zip'})
	//console.log('filePath de encriptZip', filePath);
	/*
	const iv = Buffer.alloc(16, 0); 
	const algorithm = 'aes-192-cbc';
	const password = 'Alpha123';
	const key = crypto.scryptSync(password, 'GfG', 24);
	const file = filePath;
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	var encrypted = cipher.update(file,'utf8', 'hex');
	encrypted +=cipher.final('hex');
	console.log(encrypted);*/
	/*
	let spawn = require('child_process').spawn;
	let zip = spawn('zip',['-P', 'Alpha' , 'archive.zip', filePath]);
	zip.on('exit', function(code) {
	});*/
}

async function createContract(params) {
	const contractNum = await getNextSequence('contract');
	const contractDate = await transformContractDate(params.createdAt);
	const contractStart = await transformDate(params.StartContract);
	const contractEnd = await transformDate(params.EndContract);
	let yearContract = new Date();
	yearContract = yearContract.getFullYear();
	params.contractNumber = 'P-' + contractDate + contractNum;
	const numberContract = params.contractNumber;
	statusContract = 'Active';
	const order = await getCompleteOrder(params.NumOrder);
	const orderId = order.IdOrder;
	const contract = await models.Contract.create({
		IdClient: params.IdClient,
		Contract: numberContract,
		StartContract: contractStart,
		EndContract: contractEnd,
		Status: statusContract,
		Year: yearContract,
		IdOwnerCompany: params.layout,
		IdOrder: orderId,
	});
	return contract;
}

async function getCompleteOrder(NumOrder) {
	const order = models.Order.findOne({
		where: {
			NumOrder: NumOrder,
		},
	});
	return order;
}

async function transformDate(date) {
	date = new Date(date);
	var now = date.toISOString().replace('T', ' ').replace('Z', '');
	return now;
}

async function transformContractDate(date) {
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

async function getAllClients() {
	const clients = await clientService.getAllClients();
	console.log('from contract service', clients);
}

async function getNextSequence(name) {
	const ret = await db.Counters.findOneAndUpdate(
		{_id: name},
		{$inc: {seq: 1}},
		{new: true}
	);
	return ret.seq;
}

async function getAllContracts() {
	const contractsList = await db.Contract.find();
	return contractsList;
}

async function getContractById(id) {
	if (!db.isValidId(id)) throw 'Contract ID not found';
	const contract = await db.Contract.findById(id);
	if (!contract) throw 'Contract not found';
	return contract;
}

async function updateContract(id, params, files) {
	const contract = await getContractById(id);
	if (files) {
		let zip = files.pathZip;
		let fileDir = `uploads/contracts`;

		let filePath = `${fileDir}/${zip.contractNumber}`;
		params.pathZip = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, zip.data, 'binary', function (err) {
			if (err) throw err;
		});
	}
	Object.assign(contract, params);
	await contract.save();

	return contract;
}

function basicDetails(contract) {
	const {
		_id,
		contractNumber,
		dateContract,
		numberCustomer,
		customerInformation,
		finalCustomer,
		startDateContract,
		endDateContract,
	} = contract;

	return {
		_id,
		contractNumber,
		dateContract,
		numberCustomer,
		customerInformation,
		finalCustomer,
		startDateContract,
		endDateContract,
	};
}

async function ContractsWithDatacenters() {
	try {
		const queryResult = await models.Contract.findAll({
			attributes: {
				include: [
					[
						sequelize.literal(
							'(SELECT Name FROM Clients WHERE Clients.IdClient = Contract.IdClient)'
						),
						'ClientName',
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
						include: [
							[
								sequelize.literal(
									'(SELECT COUNT(*) FROM DataCentersEquipments where IdDataCenter=DataCenters.IdDataCenter)'
								),
								'EquipmentsCount',
							],
							[
								sequelize.literal(
									'(SELECT Name FROM Countries WHERE Countries.IdCountry = DataCenters.IdCountry)'
								),
								'CountryName',
							],
							[
								sequelize.literal(
									'(SELECT State FROM Cities WHERE Cities.IdCity = DataCenters.IdCity)'
								),
								'CityName',
							],
						],
					},
				},
			],
		});

		return {status: true, msg: '', data: queryResult};
	} catch (e) {
		console.log(e);
		return {
			status: false,
			msg: 'Error al obtener la lista de contratos y datacenters.',
			data: {},
		};
	}
}

async function editAlias(contractId, contractAlias) {
	const result = {status: false, msg: '', data: {}};

	try {
		const contract = await models.Contract.findOne({where: {IdContract: contractId}});
		if (contract) {
			result.data = await models.Contract.update(contractAlias, {
				where: {
					IdContract: contractId,
				},
				//logging: console.log,
			});
			if (result.data[0] > 0) {
				result.status = true;
			} else {
				result.msg = 'Se encontró un error al actualizar el alias';
				console.log(e);
			}
		} else {
			result.msg = 'No se encontró el contrato';
			console.log(e);
		}
	} catch (e) {
		result.msg = 'Se encontró un error al actualizar el alias';
		console.log(e);
	}
	return result;
}

async function updateDataCenter(idDataCenter, dataCenter) {
	const result = {status: false, msg: '', data: {}};

	try {
		const datacenter = await models.DataCenter.findOne({
			where: {IdDataCenter: idDataCenter},
		});
		if (datacenter) {
			result.data = await models.DataCenter.update(dataCenter, {
				where: {
					IdDataCenter: idDataCenter,
				},
				//logging: console.log,
			});
			if (result.data[0] > 0) result.status = true;
		}
	} catch (e) {
		console.log(e);
	}
	return result;
}

async function updateDataCenterEquipment(idDataCenterEquipment, datacenterEquipmentData) {
	const result = {status: false, msg: '', data: {}};

	try {
		const datacenterEquipment = await models.DataCenterEquipment.findOne({
			where: {IdDataCenterEquipment: idDataCenterEquipment},
		});

		if (datacenterEquipment) {
			result.data = await models.DataCenterEquipment.update(datacenterEquipmentData, {
				where: {
					IdDataCenterEquipment: idDataCenterEquipment,
				},
				//logging: console.log,
			});
			if (result.data[0] > 0) {
				result.status = true;
			} else {
				result.msg = 'Se encontró un error al actualizar el Equipo';
				console.log(e);
			}
		} else {
			result.msg = 'No se encontró el Equipo';
			console.log(e);
		}
	} catch (e) {
		result.msg = 'Se encontró un error al actualizar el Equipo';
		console.log(e);
	}
	return result;
}

async function getEquipmentOfDataCenter(idDataCenter) {
	const result = {status: false, msg: '', data: {}};

	try {
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

		result.status = true;
		result.data = dataCenter ? dataCenter.Equipments : null;
	} catch (e) {
		result.msg = 'Se encontró un error al obtener la lista de Equipos';
		console.log(e);
	}
	return result;
}

async function getAllSLAs() {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await models.SLA.findAll({});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontró un error al obtener la lista de SLA';
		console.log(e);
	}
	return result;
}

async function getAllContracTime() {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await models.ContractTime.findAll({});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontro un error al obtener las lista de Tiempo';
		console.log(e);
	}
	return result;
}
async function getContractTimeById(params) {
	const result = {result: false, msg: 'false', data: {}};
	try {
		result.data = await models.ContractTime.findOne({
			where: {IdContractTime: params.id},
		});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontro un error al obtener el valor solicitado';
		console.log(e);
	}
	return result;
}

async function checkContracts(file) {
	return await readXlsxFile(file, {
		sheet: 'Contratos',
		includeNullValues: true,
		schema: ContractExcelModel.schema,
	});
}

async function checkEquipments(file) {
	return await readXlsxFile(file, {
		sheet: 'EquiposContrato',
		includeNullValues: true,
		schema: EquipmentExcelModel.schema,
	});
}

async function importExcelFile(contractsData, equipmentData) {
	const diff = {
		contracts: {new: 0, updated: 0},
		dataCenters: {new: 0, updated: 0},
		equipments: {new: 0, updated: 0},
	};

	const t = await sequelize.transaction();

	try {
		for (let contract of contractsData) {
			// Verify client exists
			const existingClient = await models.Client.findOne({
				where: {Name: contract.IdClient},
				attributes: ['IdClient'],
				transaction: t,
			});

			if (!existingClient) {
				throw new ExcelValidationError(`No existe el Cliente '${contract.IdClient}'`);
			}

			// Verify ownercompany exists
			const existingOwnerCompany = await models.OwnerCompany.findOne({
				where: {Name: contract.OwnerCompany},
				attributes: ['IdOwnerCompany'],
				transaction: t,
			});

			if (!existingOwnerCompany) {
				throw new ExcelValidationError(
					`No existe la OwnerCompany '${contract.OwnerCompany}'`
				);
			}

			contract.IdOwnerCompany = existingOwnerCompany.IdOwnerCompany;

			// Verify Purchase Order exists
			const existingOrder = await models.Order.findOne({
				where: {NumOrder: contract.Order},
				attributes: ['IdOrder'],
				transaction: t,
			});

			if (!existingOrder) {
				throw new ExcelValidationError(`No existe la orden '${contract.Order}'`);
			}

			contract.IdOrder = existingOrder.IdOrder;

			// Verify country
			const existingCountry = await models.Country.findOne({
				where: {Name: contract.DataCenter.Country},
				//logging: console.log,
			});

			if (!existingCountry) {
				throw new ExcelValidationError(
					`No existe el Pais: '${contract.DataCenter.IdCountry}'`
				);
			}

			contract.DataCenter.IdCountry = existingCountry.IdCountry;

			// Verify City
			const existingCity = await models.City.findOne({
				where: {
					State: contract.DataCenter.City,
					IdCountry: contract.DataCenter.IdCountry,
				},
				//logging: console.log,
			});

			if (!existingCity) {
				throw new ExcelValidationError(
					`No existe la Ciudad: '${contract.DataCenter.City}'`
				);
			}

			contract.DataCenter.IdCity = existingCity.IdCity;

			//Verify contract time
			let existingContractTime = await models.ContractTime.findOne({
				where: {Duration: contract.Months},
				transaction: t,
			});

			contract.IdContractTime = existingContractTime.IdContractTime;

			// Verify contract
			let existingContract = await models.Contract.findOne({
				where: {Contract: contract.Contract},
				include: [
					{
						model: models.Client,
						as: 'Client',
						where: {
							IdClient: existingClient.IdClient,
						},
					},
				],
				transaction: t,
			});

			if (!existingContract) {
				// Convert name of client to id
				contract.IdClient = existingClient.IdClient;

				existingContract = await models.Contract.create(contract, {
					transaction: t,
				});
				diff.contracts.new++;
			} else {
				//  Dont modify existing client id
				delete contract.IdClient;

				existingContract = setValues(existingContract, contract);

				if (existingContract.changed()) {
					await existingContract.save({transaction: t});
					diff.contracts.updated++;
				}
			}

			// Verify DataCenter exists
			let existingDataCenter = await models.DataCenter.findOne({
				where: {
					IdContract: existingContract.IdContract,
					DataCenter: contract.DataCenter.DataCenter,
				},
				transaction: t,
			});

			if (!existingDataCenter) {
				existingDataCenter = await models.DataCenter.create(
					{IdContract: existingContract.IdContract, ...contract.DataCenter},
					{
						transaction: t,
					}
				);
				diff.dataCenters.new++;
			}
		}

		for (equipment of equipmentData) {
			// Search contract and Datacenter
			let existingContract = await models.Contract.findOne({
				where: {
					Contract: equipment.Contract,
				},
				include: [
					{
						model: models.DataCenter,
						as: 'DataCenters',
						where: {
							DataCenter: equipment.DataCenter,
						},
					},
				],
				transaction: t,
			});

			if (!existingContract) {
				throw new ExcelValidationError(
					`No existe el contrato '${equipment.Contract}' o el DataCenter '${equipment.DataCenter}' no existe en el contrato`
				);
			}

			// Verify if the Equipment already exists
			let existingEquipment = await models.Equipment.findOne({
				where: {Serial: equipment.Serial, Model: equipment.Model},
				transaction: t,
			});

			// Verify the Brand
			const existingBrand = await models.Brand.findOne({
				where: {NameBrand: equipment.Brand},
				attributes: ['IdBrand'],
				transaction: t,
			});

			if (!existingBrand) {
				throw new ExcelValidationError(`La marca '${equipment.Brand}' no existe`);
			}

			delete equipment.Brand;
			equipment.IdBrand = existingBrand.IdBrand;

			// Verify the Equipment Type
			const existingEquipmentType = await models.TypePart.findOne({
				where: {Name: equipment.Equipment},
				attributes: ['IdTypePart'],
				transaction: t,
			});

			if (!existingEquipmentType) {
				throw new ExcelValidationError(
					`El tipo de parte '${equipment.Equipment}' no existe`
				);
			}

			delete equipment.Equipment;
			equipment.IdTypePart = existingEquipmentType.IdTypePart;

			// Verify the Provider
			const existingProvider = await models.Provider.findOne({
				where: {Name: equipment.HardwareProvider},
				attributes: ['IdProvider'],
				transaction: t,
			});

			if (!existingProvider) {
				throw new ExcelValidationError(
					`El proveedor '${equipment.HardwareProvider}' no existe`
				);
			}
			delete equipment.HardwareProvider;
			equipment.IdProvider = existingProvider.IdProvider;

			// All the data is valid, then we choose what to do with the equipment
			if (!existingEquipment) {
				existingEquipment = await models.Equipment.create(equipment, {transaction: t});
				diff.equipments.new++;
			} else {
				if (existingEquipment.changed()) {
					await existingEquipment.save({transaction: t});
					diff.equipments.updated++;
				}
			}

			const DataCenterEquipment = {
				IdDataCenter: existingContract.DataCenters[0].IdDataCenter,
				IdEquipment: existingEquipment.IdEquipment,
			};

			let existingRelationContractDataCenter = await models.DataCenterEquipment.findOne({
				where: DataCenterEquipment,
				transaction: t,
			});

			// Verify the SLA
			if (equipment.DataCenterEquipment && equipment.DataCenterEquipment.SLA) {
				const existingSLA = await models.SLA.findOne({
					where: {Name: equipment.DataCenterEquipment.SLA},
					transaction: t,
				});

				if (!existingSLA) {
					throw new ExcelValidationError(`El SLA '${equipment.SLA}' no existe`);
				}
				DataCenterEquipment.IdSLA = existingSLA.IdSLA;
			}

			if (!existingRelationContractDataCenter) {
				if (equipment.DataCenterEquipment) {
					DataCenterEquipment.Ip = equipment.DataCenterEquipment.IP
						? equipment.DataCenterEquipment.IP
						: null;
					DataCenterEquipment.ServiceTag = equipment.DataCenterEquipment.ServiceTag
						? equipment.DataCenterEquipment.ServiceTag
						: null;
				}

				await models.DataCenterEquipment.create(DataCenterEquipment, {
					transaction: t,
				});
			}
		}
		await t.commit();
		return diff;
	} catch (e) {
		await t.rollback();
		throw e;
		//throw new ExcelValidationError(`Error`);
	}
}

function buildAddressRequest(address) {
	return `?country=${address.Country}&city=${address.City}`;
}

function setValues(target, values) {
	for (const key of Object.keys(values)) {
		target[key] = values[key];
	}
	return target;
}

async function getDatacentersByState() {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await models.DataCenter.findAll({
			attributes: ['Country'],
			include: [
				{
					model: models.Contract,
					as: 'Contract',
				},
			],
		});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontró un error al obtener la lista de datacenters por estado';
		console.log(e);
	}
	return result;
}

async function getAllCountries() {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await models.Country.findAll({});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontró un error al obtener la lista de Paises';
		console.log(e);
	}
	return result;
}

async function getAllCitiesForCountry(IdCountry) {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await models.City.findAll({
			where: {IdCountry: IdCountry},
		});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontró un error al obtener la lista de Ciudades';
		console.log(e);
	}
	return result;
}

module.exports = {
	createContract,
	getAllContracts,
	getContractById,
	saveContractZip,
	//postResponse,
	updateContract,
	ContractsWithDatacenters,
	editAlias,
	getCompleteOrder,
	updateDataCenter,
	updateDataCenterEquipment,
	getEquipmentOfDataCenter,
	getAllSLAs,
	checkContracts,
	checkEquipments,
	importExcelFile,
	getAllContracTime,
	getContractTimeById,
	getAllCountries,
	getAllCitiesForCountry,
};
