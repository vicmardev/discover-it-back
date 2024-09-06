const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const taskService = require('services/task.service');

module.exports = {
	createTask,
	createSchema,
	getAllTask,
	updateSchema,
	updateTask,
	getTaskById,
};

function createSchema(req, res, next) {
	const schema = Joi.object({
		Title: Joi.string().required(),
		StartDate: Joi.date().required(),
		EndDate: Joi.date().required(),
		CreatedBy: Joi.string().required(),
		AssignedTo: Joi.number().required(),
		Comments: Joi.string().allow(''), //allow empty string
	});
	validateRequest(req, next, schema);
}

function createTask(req, res, next) {
	taskService
		.createTask(req.body)
		.then(task => res.json(task))
		.catch(next);
}

function getAllTask(req, res, next) {
	if (req.query && req.query.selectors) {
		taskService
			.getTaskSelectorValues()
			.then(task => res.json(task))
			.catch(next);
	} else {
		taskService
			.getAllTask()
			.then(task => res.json(task))
			.catch(next);
	}
}

function updateSchema(req, res, next) {
	const schema = Joi.object({
		Title: Joi.string().required(),
		StartDate: Joi.date().required(),
		EndDate: Joi.date().required(),
		UpdatedBy: Joi.string().required(),
		AssignedTo: Joi.number().required(),
		Comments: Joi.string().allow(''), //allow empty string
	});
	validateRequest(req, next, schema);
}

function updateTask(req, res, next) {
	taskService
		.updateTask(req.params.id, req.body)
		.then(task => res.json(task))
		.catch(next);
}

function getTaskById(req, res, next) {
	taskService
		.getTaskById(req.params.id)
		.then(task => res.json(task))
		.catch(next);
}
