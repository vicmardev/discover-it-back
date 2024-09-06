const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const partWerehouseService = require('services/parts-werehouse.service');
const os = require('os');
const tempDir = os.tmpdir();
const path = require('path');

module.exports = {
	createSchema,
	createPart,
	getAllparts,
	updatePart,
	contactStorer,
	substractParts,
	updatePartByserial,
	verifyItems,
	addItems,
	getRelatedParts,
	getAvailableParts,
	notifyNoAvailableParts,
	createOperationPart,
	createPartSequelize,
	getPartField,
	getAllPartsSequelize,
	getRelatedPartsSequelize,
};

function verifyItems(req, res, next) {
	if (!partWerehouseService.authorize(req.body.token))
		res.status(403).send({message: 'unauthorized'});
	if (!req.files) res.send({data: {error: 'File is empty'}});

	// Move file to temp dir
	const fileUploaded = req.files.parts_file;
	const pathToUploadedFile = tempDir + path.sep + fileUploaded.name;
	fileUploaded.mv(pathToUploadedFile, error => {
		if (!error) {
			let partsFromFile = partWerehouseService.getPartsFromFile(pathToUploadedFile);
			partsFromFile.then(fileParts => {
				if (fileParts.errors.length === 0) {
					let diff = partWerehouseService.calcDifference(fileParts);
					diff.then(data => {
						res.send({data});
					});
				} else {
					res.send({
						data: {error: 'invalid values', list: fileParts.errors},
					});
				}
			});
		} else {
			res.send({data: {error: 'File could not be uploaded'}});
		}
	});
}

function addItems(req, res, next) {
	if (!partWerehouseService.authorize(req.body.token))
		res.status(403).send({message: 'unauthorized'});
	if (!req.files) res.send({data: {error: 'File is empty'}});

	const fileUploaded = req.files.parts_file;
	const pathToUploadedFile = tempDir + path.sep + fileUploaded.name;
	fileUploaded.mv(pathToUploadedFile, error => {
		if (!error) {
			const partsFromFile = partWerehouseService.getPartsFromFile(pathToUploadedFile);
			partsFromFile.then(fileParts => {
				if (fileParts.errors.length === 0) {
					const updatedItems = partWerehouseService.importParts(fileParts);
					updatedItems.then(data => {
						res.send({message: 'success', updated: data});
					});
				} else {
					res.send({data: {error: 'Invalid values in the uploaded file'}});
				}
			});
		} else {
			res.send({data: {error: 'File could not be uploaded'}});
		}
	});
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		type: Joi.string().required(),
		brand: Joi.string().required(),
		model: Joi.string().required(),
		serialNumber: Joi.string().required(),
		partNumber: Joi.string.string().required(),
		capacity: Joi.string().required(),
		quantity: Joi.number().required(),
		contract: Joi.string().required(),
		description: Joi.string().required(),
		dischargeDate: Joi.date.required(),
		status: Joi.string().required(),
		supplier: Joi.string().required(),
	});
	validateRequest(req, res, next);
}

function createPart(req, res, next) {
	partWerehouseService
		.createPart(req.body)
		.then(part => res.json(part))
		.catch(next);
}

function createPartSequelize(req, res, next) {
	partWerehouseService
		.createPartSequelize(req.body)
		.then(part => res.json(part))
		.catch(next);
}

function createOperationPart(req, res, next) {
	partWerehouseService
		.createOperationPart(req.body)
		.then(part => res.json(part))
		.catch(next);
}

function getPartField(req, res, next) {
	switch (req.query.field) {
		case 'store':
			partWerehouseService.getStoreViewValue().then(store => res.json(store));
			break;

		case 'provider':
			partWerehouseService.getProviderViewValue().then(provider => res.json(provider));
			break;

		default:
			partWerehouseService.getPartTypes().then(part => res.json(part));
			break;
	}
}

function getAllparts(req, res, next) {
	if (req.query.status) {
		let status = req.query.status;
		partWerehouseService
			.getPartsByStatus(status)
			.then(partList => res.json(partList))
			.catch(next);
	} else {
		partWerehouseService
			.getAllparts()
			.then(partList => res.json(partList))
			.catch(next);
	}
}

function getAllPartsSequelize(req, res, next) {
	if (req.query && req.query.Id && req.query.SerialNumber) {
		partWerehouseService
			.getOperationPartBySerial(req.query.Id, req.query.SerialNumber)
			.then(partList => res.json(partList))
			.catch(next);
	} else {
		partWerehouseService
			.getAllParts()
			.then(partList => res.json(partList))
			.catch(next);
	}
}

function getRelatedParts(req, res, next) {
	if (req.query.brand && req.query.part && req.query.model && req.query.partNumber) {
		partWerehouseService
			.getRelatedParts(req.query)
			.then(parts => res.json(parts))
			.catch(next);
	} else {
		res.json({error: 'Required parameters missing'});
	}
}

function getRelatedPartsSequelize(req, res, next) {
	if (req.query.Id) {
		partWerehouseService
			.getRelatedPartsSequelize(req.query)
			.then(parts => res.json(parts))
			.catch(next);
	} else {
		res.json({error: 'Required parameters missing'});
	}
}

function getAvailableParts(req, res, next) {
	if (req.query.brand && req.query.part && req.query.model && req.query.partNumber) {
		partWerehouseService
			.getRelatedPartsAvailable(req.query)
			.then(parts => {
				res.json(parts);
			})
			.catch(next);
	} else {
		res.json({error: 'Required parameters missing'});
	}
}

function notifyNoAvailableParts(req, res, next) {
	if (req.query.brand && req.query.part && req.query.model && req.query.partNumber) {
		partWerehouseService.notifyNoAvailableParts(req.query);
		res.json({state: 'success'});
	} else {
		res.json({state: 'error', message: 'Required parameters missing'});
	}
}

function updatePart(req, res, next) {
	partWerehouseService
		.updatePart(req.params.id, req.body)
		.then(part => res.json(part))
		.catch(next);
}

function contactStorer(req, res, next) {
	partWerehouseService
		.contactStorer(req.body, req.get('origin'))
		.then(() => res.json({message: 'Please check the email admin'}))
		.catch(next);
}

function substractParts() {}

function updatePartByserial(req, res, next) {
	partWerehouseService
		.updatePartByserial(req.params.serial, req.body)
		.then(part => res.json(part))
		.catch(next);
}
