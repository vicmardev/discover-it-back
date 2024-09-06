const Joi = require('joi');
const contractService = require('services/contract.service');
const os = require('os');
const tempDir = os.tmpdir();
const path = require('path');
const {ExcelValidationError} = require('../classes/error/ExcelValidationError');

module.exports = {
	createContract,
	getAllContracts,
	getContractById,
	updateContract,
	postResponse,
	ContractsWithDatacenters,
	editAlias,
	getCompleteOrder,
	updateDataCenter,
	updateDataCenterEquipment,
	getEquipmentOfDataCenter,
	importExcelFile,
	getAllSLAs,
	getAllContracTime,
	getContractTimeById,
	getAllCountries,
	getAllCitiesForCountry,
	saveContractZip
};

function postResponse(req, res, next) {
	contractService
		.postResponse(req.body, req.files.zip_file)
		.then(contract => res.json(contract))
		.catch(next);
}

function saveContractZip(req, res, next){
	//console.log(req.body);
	//console.log(req.files.Test);
	contractService
	.saveContractZip(req.body, req.files.Test)
	.then(contractZip => res.json(contractZip))
	.catch(next)
}

function createContract(req, res, next) {
	contractService
		.createContract(req.body)
		.then(contract => res.json(contract))
		.catch(next);
}

function getAllContracts(req, res, next) {
	if (req.query.filePath) {
		let filePath = req.query.filePath.toString();
		const file = path.resolve(filePath);
		res.download(filePath, file);
	} else {
		contractService
			.getAllContracts()
			.then(contractList => res.json(contractList))
			.catch(next);
	}
}

function getContractById(req, res, next) {
	contractService
		.getContractById(req.params.id)
		.then(contract => (contract ? res.json(contract) : res.sendStatus(404)))
		.catch(next);
}

function getCompleteOrder(req, res, next) {
	contractService
		.getCompleteOrder(req.params.NumOrder)
		.then(order => res.json(order))
		.catch(next);
}

function updateContract(req, res, next) {
	contractService
		.updateContract(req.params.id, req.body, req.files)
		.then(contract => res.json(contract))
		.catch(next);
}

function ContractsWithDatacenters(req, res, next) {
	contractService
		.ContractsWithDatacenters()
		.then(queryResult => res.json(queryResult))
		.catch(next);
}

function editAlias(req, res, next) {
	const contractId = req.params.contractId;
	contractService.editAlias(contractId, req.body).then(result => {
		res.json(result);
	});
}

function updateDataCenter(req, res, next) {
	const idDataCenter = req.params.idDataCenter;
	contractService
		.updateDataCenter(idDataCenter, req.body)
		.then(dataCenter => res.json(dataCenter));
}

function updateDataCenterEquipment(req, res, next) {
	const idDataCenterEquipment = req.params.idDataCenterEquipment;
	contractService
		.updateDataCenterEquipment(idDataCenterEquipment, req.body)
		.then(equipment => res.json(equipment));
}

function getEquipmentOfDataCenter(req, res, next) {
	const idDataCenter = req.params.idDataCenter;
	contractService
		.getEquipmentOfDataCenter(idDataCenter)
		.then(equipmentList => res.json(equipmentList))
		.catch(next);
}

function getAllSLAs(req, res, next) {
	contractService
		.getAllSLAs()
		.then(results => res.json(results))
		.catch(next);
}

function getAllContracTime(req, res, next) {
	contractService
		.getAllContracTime()
		.then(result => res.json(result))
		.catch(next);
}

function getContractTimeById(req, res, next) {
	contractService
		.getContractTimeById(req.params)
		.then(result => res.json(result))
		.catch(next);
}

async function importExcelFile(req, res, next) {
	const result = {status: false, msg: '', data: {}};

	//if (!contractService.authorize(req.body.token))
	//	return res.status(403).send({message: 'unauthorized'});

	if (!req.files) {
		result.msg = 'File not selected';
		return res.send(res.json(result));
	}

	try {
		const fileTempPath = `${tempDir}${path.sep}${req.files.upload_file.name}`;

		await req.files.upload_file.mv(fileTempPath);
		const contracts = await contractService.checkContracts(fileTempPath);

		if (contracts.errors.length === 0) {
			const equipments = await contractService.checkEquipments(fileTempPath);

			if (equipments.errors.length === 0) {
				const diff = await contractService.importExcelFile(
					contracts.rows,
					equipments.rows
				);
				result.status = true;
				result.data = {diff: diff};
			} else {
				result.status = false;
				result.data = {excelErrors: equipments.errors, sheet: 'EquiposContrato'};
			}
		} else {
			result.status = false;
			result.data = {excelErrors: contracts.errors, sheet: 'Contratos'};
		}
	} catch (e) {
		if (e instanceof ExcelValidationError) {
			result.msg = e.toString();
		} else {
			console.log(e);
			result.msg = 'Error al importar archivo de Excel';
		}
	}
	res.send(result);
}

function getDatacentersByState(req, res, next) {
	contractService
		.getDatacentersByState()
		.then(results => res.json(results))
		.catch(next);
}

function getAllCountries(req, res, next) {
	contractService
		.getAllCountries()
		.then(results => res.json(results))
		.catch(next);
}

function getAllCitiesForCountry(req, res, next) {
	contractService
		.getAllCitiesForCountry(req.params.CountryCode)
		.then(results => res.json(results))
		.catch(next);
}
