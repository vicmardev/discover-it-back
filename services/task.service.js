const Queue = require('../helpers/queue.js');
const db = require('database/db');
const Sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const ticketAlertService = require('services/ticket-alert.service');

//SupportOperators queue
module.exports = {
	createTask,
	getAllTask,
	updateTask,
	getTaskById,
	getTaskSelectorValues,
};

const queue = new Queue();

async function getAllTask() {
	let tasks = await models.Task.findAll({
		include: [
			{model: models.SupportOperator, attributes: ['IdSupportOPerators', 'Name']},
		],
	});

	return tasks;
}

async function createTask(params) {
	//check that customer (client) exist
	const customer = models.SupportOperator.findByPk(params.AssignedTo);
	if (!customer) {
		throw `invalid operator Id.`;
	}
	//always create new task
	try {
		const newTask = await models.Task.create(params);

		return newTask;
	} catch (error) {
		throw error;
	}
}

async function updateTask(id, params) {
	//check that task exist
	const task = await getTaskById(id);
	if (!task) {
		throw `invalid task id.`;
	}

	//update task
	try {
		task.set(params);
		await task.save();
		return task;
	} catch (error) {
		throw error;
	}
}

async function getTaskById(id) {
	const task = await models.Task.findByPk(id);
	return task;
}

async function getTaskSelectorValues() {
	const operators = await models.SupportOperator.findAll({
		attributes: [
			['IdSupportOPerators', 'value'],
			['Name', 'viewValue'],
			[Sequelize.fn('COUNT', Sequelize.col('Tasks.IdTask')), 'y'],
		],
		group: ['Tasks.AssignedTo'],
		include: [
			{
				model: models.Task,
				// as: 'OperationPartsList',
				attributes: [],
			},
		],
	});

	return {
		Operators: operators,
	};
}
