const config = require('config.json');
const db = require('database/db');
const Role = require('helpers/role');
const fs = require('fs');
const sendEmail = require('helpers/send-email');
const readXlsxFile = require('read-excel-file/node');
const {string, date, types} = require('joi');
const {parseExcelDate} = require('read-excel-file');
const Sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const {resolve} = require('path');
const {get} = require('http');
const token = 'Z^M%pK2R8Xg&ZJhY';

module.exports = {
	authorize,
	getAllparts,
	getPartsByStatus,
	createPart,
	updatePart,
	getPartById,
	contactStorer,
	updatePartByserial,
	getPartBySerial,
	getPartsFromFile,
	getOldParts,
	calcDifference,
	importParts,
	getRelatedParts,
	notifyNoAvailableParts,
	getRelatedPartsAvailable,
	createOperationPart,
	createPartSequelize,
	getPartTypes,
	getStoreViewValue,
	getProviderViewValue,
	getAllParts,
	getRelatedPartsSequelize,
	getOperationPartBySerial,
};

async function getPartsFromFile(file) {
	const schema = {
		MARCA: {
			prop: 'brand',
			type: String,
			required: true,
		},
		PART: {
			prop: 'part',
			type: String,
			required: true,
		},
		MODELO: {
			prop: 'model',
			type: String,
			required: true,
		},
		'P/N': {
			prop: 'partNumber',
			type: String,
			required: true,
		},
		'S/N': {
			prop: 'serialNumber',
			type: String,
			required: true,
		},
		QTY: {
			prop: 'quantity',
			required: true,
			type: value => {
				return 1; // Always return quantity as 1
			},
		},
		'INVOICE NO.': {
			prop: 'invoice',
			type: Number,
			required: false,
		},
		CLIENTE: {
			prop: 'client',
			type: String,
			required: false,
		},
		'No. Contrato': {
			prop: 'contract',
			type: String,
			required: false,
		},
		'For Ticket': {
			prop: 'ticket',
			type: String,
			required: false,
		},
		'Fecha de reemplazo': {
			prop: 'replaceDate',
			type: Date,
			required: false,
		},
	};

	return await readXlsxFile(file, {schema});
}

async function calcDifference(parts) {
	let newParts = 0;
	let diffParts = 0;

	for (let p of parts.rows) {
		const oldPart = await checkPartExists(p);
		if (oldPart === null) {
			newParts++;
			continue;
		}

		const result = await compareKeys(p, oldPart._doc);

		if (!result) {
			diffParts++;
		}
	}

	return {newParts, diffParts};
}

async function importParts(parts) {
	let updatedItems = 0;
	for (let p of parts.rows) {
		p.status = true;
		const filter = {
			brand: p.brand,
			part: p.part,
			model: p.model,
			partNumber: p.partNumber,
			serialNumber: p.serialNumber,
		};
		const op = await db.Parts.updateOne(filter, p, {upsert: true});

		if (op.nModified > 0 || op.upserted) updatedItems += 1;
	}

	return updatedItems;
}

async function compareKeys(a, b) {
	const aOrdered = Object.fromEntries(Object.entries(a).sort());
	const bOrdered = Object.fromEntries(Object.entries(b).sort());

	return JSON.stringify(aOrdered) === JSON.stringify(bOrdered);
}

async function getPartBySerial(serial) {
	const part = await db.Parts.findOne({serialNumber: serial});
	if (!part) throw 'Serial not found';
	return part;
}

async function getOldParts() {
	return await db.Parts.find({}, {_id: false});
}

async function checkPartExists(part) {
	return await db.Parts.findOne(
		{
			brand: part.brand,
			part: part.part,
			model: part.model,
			partNumber: part.partNumber,
			serialNumber: part.serialNumber,
		},
		{_id: false, __v: false}
	);
}

async function getRelatedParts(query) {
	return await db.Parts.find(
		{
			brand: query.brand,
			part: query.part,
			model: query.model,
			partNumber: query.partNumber,
		},
		{__v: false}
	);
}
async function getRelatedPartsAvailable(query) {
	return await db.Parts.find(
		{
			status: true,
			brand: query.brand,
			part: query.part,
			model: query.model,
			partNumber: query.partNumber,
		},
		{__v: false}
	);
}

async function getAllparts() {
	/*
    const partsList = await db.Parts.find().sort({'model': 1});
    return partsList;*/
	const match = {};
	const partListOrder = await db.Parts.aggregate([
		{
			$group: {
				_id: '$model',
				brand: {$first: '$brand'},
				part: {$first: '$part'},
				model: {$first: '$model'},
				partNumber: {$first: '$partNumber'},
				quantity: {$count: {}},
				//parts: {$push: '$serialNumber'},
			},
		},
		{
			$sort: {brand: 1},
		},
	]);
	return partListOrder;
}

async function getPartsByStatus(statusIn) {
	const match = {};
	const partListOrder = await db.Parts.aggregate([
		{
			$match: {status: statusIn},
		},
		{
			$group: {
				_id: '$model',
				type: {$first: '$type'},
				brand: {$first: '$brand'},
				model: {$first: '$model'},
				partNumber: {$first: '$partNumber'},
				capacity: {$first: '$capacity'},
				status: {$first: '$status'},
				quantity: {$count: {}},
				parts: {$push: '$serialNumber'},
			},
		},
		{
			$sort: {brand: 1},
		},
	]);

	return partListOrder;
}

async function createPart(params) {
	const part = new db.Parts(params);
	await part.save();
}

async function createPartSequelize(params) {
	part = await models.Part.findOne({where: {PartNumber: params.PartNumber}});

	//update existing part
	if (part != null) {
		part.set(params);
		part.save();
		return part;
	}

	//part does not exist yet
	const newPart = await models.Part.create(params);
	await newPart.save();
	return newPart;
}

async function getRelatedPartsSequelize(query) {
	return await models.OperationPart.findAll({
		where: {
			IdPart: query.Id,
		},
	});
}

async function getPartTypes() {
	const types = await models.TypePart.findAll({
		attributes: [
			['Name', 'viewValue'],
			['Name', 'value'],
		],
	});
	return types;
}

async function getStoreViewValue() {
	const stores = await models.Store.findAll({
		attributes: [
			['Name', 'viewValue'],
			['IdStore', 'value'],
		],
	});
	return stores;
}

async function getProviderViewValue() {
	const stores = await models.Provider.findAll({
		attributes: [
			['Name', 'viewValue'],
			['IdProvider', 'value'],
		],
	});
	return stores;
}

async function createOperationPart(params) {
	let part = await models.Part.findOne({where: {PartNumber: params.PartNumber}});
	//part does not exist
	if (part == null) return undefined;

	params.OperationPart.IdPart = part.IdPart;
	let operationPart = await models.OperationPart.findByPk(
		params.OperationPart.SerialNumber
	);

	//update existing operation part
	if (operationPart != null) {
		//update rack data in case part is moved
		let rack = await models.RackStore.findByPk(operationPart.IdRack);
		//rack might not exist
		if (rack == null) {
			console.log('\nrack null\n');
			rack = await createRackStore(params.Rack);
			params.OperationPart.IdRack = rack.IdRack;

			console.log(rack);
		} else {
			rack.set(params.Rack);
			rack.save();
		}

		operationPart.set(params.OperationPart);
		operationPart.save();
	} else {
		//operation part does not exist yet
		//create rack where part is put
		const rack = await createRackStore(params.Rack);
		params.OperationPart.IdRack = rack.IdRack;

		operationPart = await models.OperationPart.create(params.OperationPart);
		await operationPart.save();
	}

	// return part with operation part info
	part = await getOperationPartBySerial(part.IdPart, operationPart.SerialNumber);

	return part;
}

async function getOperationPartBySerial(partNumber, serialNumber) {
	// return part with operation part info
	const part = await models.Part.findOne({
		where: {IdPart: partNumber},
		attributes: [
			'IdPart',
			'PartNumber',
			'TypePart',
			'Brand',
			'Model',
			[Sequelize.fn('COUNT', Sequelize.col('Part.IdPart')), 'Count'],
		],
		include: [
			{
				model: models.OperationPart,
				// as: 'OperationPartsList',
				where: {SerialNumber: serialNumber},
				attributes: ['SerialNumber', 'DateEntry', 'UserEntry'],
				include: [
					// [Sequelize.fn('COUNT', Sequelize.col('models.OperationPart.IdPart')), 'Count'],
					{
						model: models.RackStore,
						as: 'Rack',
						attributes: ['IdStore', 'NameRack', 'Column', 'Row'],
					},
				],
			},
		],
	});
	return part;
}

async function getAllParts() {
	// return part with operation part info
	const part = await models.Part.findAll({
		attributes: {
			include: [[Sequelize.fn('COUNT', Sequelize.col('OperationParts.IdPart')), 'Count']],
		},

		group: ['OperationParts.IdPart'],

		include: [
			{
				model: models.OperationPart,
				// as: 'OperationPartsList',
				attributes: [],
			},
		],
	});
	return part;
}

async function createRackStore(params) {
	//Create new rack every time. This way we have no collisions when inserting a new part to the system.
	//This also lets us count the amount of spaces that are occupied in rack.
	//You can simply group the the index by rack name, col and row to get the count of space occupied.
	//This means you have to delete the rack when an operation part is taken out of the warehouse.
	const newRack = await models.RackStore.create(params);
	await newRack.save();
	return newRack;
}

async function deleteSequelizeitem(modelName, query) {
	models[modelName].destroy({
		where: query,
	});
}

async function updatePart(id, params) {
	const part = await getPartById(id);
	Object.assign(part, params);
	await part.save();
	return part;
}

async function getPartById(id) {
	if (!db.isValidId(id)) throw 'Part not found';
	const part = await db.Parts.findById(id);
	if (!part) throw 'Part not found';
	return part;
}

async function updatePartByserial(serial, params) {
	const part = await getPartBySerial(serial);
	part.status = 'Inactivo';
	await part.save();
}

async function contactStorer(body, origin) {
	let message;
	if (origin) {
		message = `<p>Se solicita abastecimiento de inventario.
        <h4>Datos de  contacto de la  solicitud:</h4>
        <span style="color:#0099CC">Usuario: </span> Test de que pex<br>
        </p><br>
        <p style="text-align: center"> Agradecemos su pronta respuesta.</p>`;
	} else {
		message = `<p> El correo no llego a la bandeja</p>`;
	}

	await sendEmail({
		to: 'discoverIT@virwo.com',
		subject: 'Abastacimiento de inventario',
		html: `<h4>Abastecimiento</h4>${message}`,
	});
}

async function notifyNoAvailableParts(partInfo) {
	let emailBody = `<ul><li><b>Marca:</b> ${partInfo.brand}</li><li><b>Modelo:</b> ${partInfo.model}</li><li><b>Parte:</b> ${partInfo.part}</li><li><b>No. de parte:</b> ${partInfo.partNumber}</li></ul>`;
	await sendEmail({
		to: 'discoverIT@virwo.com',
		subject: 'Abastacimiento de inventario',
		html: `<h4>Abastecimiento</h4>${emailBody}`,
	});
}

function authorize(token_provided) {
	return token_provided === token ? true : false;
}

async function updatePartByserial(files) {
	return true;
}
