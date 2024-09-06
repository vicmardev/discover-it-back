const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const ticketAlertService = require('services/ticket-alert.service');
const path = require('path');

module.exports = {
	createSchema,
	createTicketAlert,
	getTicketAlertById,
	getAllTicketAlerts,
	postResponseTicketAlert,
	updateSchema,
	updateTicketAlert,
	getImage,
	postTicketQuestion,
	updateTicketFile,
	getAllTicketAlertsGroupByOperator,
	aliasSchema,
	setTicketAlias,
};

function createSchema(req, res, next) {
	const schema = Joi.object({
		contract: Joi.string(),
		host: Joi.string().required(),
		location: Joi.string(),
		affectedPart: Joi.string().required(),
		statusHost: Joi.string().required(),
		titleTicket: Joi.string().required(),
		userClient: Joi.string,
		userPhone: Joi.string(),
		brand: Joi.string,
		model: Joi.string(),
		serial: Joi.string().required(),
		supportAssignment: Joi.string(),
	});
	validateRequest(req, next, schema);
}

function createTicketAlert(req, res, next) {
	ticketAlertService
		.createTicketAlert(req.body)
		.then(ticketAlert => res.json(ticketAlert))
		.catch(next);
}

function getImage(req, res, next) {
	if (req.query.filePath) {
		let file = req.query.filePath.toString();
		res.sendFile(path.resolve(file));
	} else {
		ticketAlertService
			.getImage()
			.then(image => {
				res.json(image);
			})
			.catch(next);
	}
}

function getAllTicketAlerts(req, res, next) {
	if (req.query.filePath) {
		let file = req.query.filePath.toString();
		res.sendFile(path.resolve(file));
	} else {
		ticketAlertService
			.getAllTicketAlerts()
			.then(ticketAlertList => res.json(ticketAlertList))
			.catch(next);
	}
}

function getAllTicketAlertsGroupByOperator(req, res, next) {
	ticketAlertService
		.getAllTicketAlertsGroupByOperator()
		.then(ticketAlertList => res.json(ticketAlertList))
		.catch(next);
}

function getTicketAlertById(req, res, next) {
	ticketAlertService
		.getTicketAlertById(req.params.id)
		.then(ticketAlert => (ticketAlert ? res.json(ticketAlert) : res.sendStatus(400)))
		.catch(next);
}

function postResponseTicketAlert(req, res, next) {
	ticketAlertService
		.postResponse(req.body, req.files)
		.then(ticketAlert => res.json(ticketAlert))
		.catch(next);
}
function postTicketQuestion(req, res, next) {
	ticketAlertService
		.postQuestions(req.body)
		.then(ticketAlert => res.json(ticketAlert))
		.catch(next);
}
function updateSchema(req, res, next) {
	const schema = Joi.object({
		stepTicket: Joi.number().required(),
		statusTicket: Joi.string().required(),
		responsableReassig: Joi.string(),
		solutionReassig: Joi.string(),
		dateSolutionReassig: Joi.date(),
		evidenceReassig: Joi.string(),
	});
	validateRequest(req, next, schema);
}

function updateTicketFile(req, res, next) {
	ticketAlertService
		.updateTicketFile(req.params.id, req.body, req.files)
		.then(ticketAlert => res.json(ticketAlert))
		.catch(next);
}

function updateTicketAlert(req, res, next) {
	if (req.query.case) {
		switch (req.query.case) {
			case 'reassign':
				ticketAlertService
					.updateTicketReassign(req.params.id, req.query, req.files)
					.then(ticketAlert => res.json(ticketAlert))
					.catch(next);
				break;

			default:
				break;
		}
	} else {
		ticketAlertService
			.updateTicketAlert(req.params.id, req.query, req.files)
			.then(ticketAlert => res.json(ticketAlert))
			.catch(next);
	}
}

function aliasSchema(req, res, next) {
	const schemaRules = {
		TicketID: Joi.string().required(),
		Alias: Joi.string().required().allow(null, ''),
	};

	const schema = Joi.object(schemaRules);
	validateRequest(req, next, schema);
}

function setTicketAlias(req, res, next) {
	ticketAlertService
		.setTicketAlias(req.body.TicketID, req.user.id, req.body.Alias)
		.then(equipment => res.json(equipment))
		.catch(next);
}
