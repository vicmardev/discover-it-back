const {json} = require('body-parser');
const config = require('config.json');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const toUpperCamelCase = require('../helpers/camelCase');

module.exports = {
	getAllOperators,
	createOperator,
	updateOperatorStatus,
	getNameLevel,
	editOperator,
};

async function getNameLevel() {
	try {
		const nameLevel = models.LevelScalation.findAll({});
		return nameLevel;
	} catch (error) {
		throw error;
	}
}

async function getAllOperators() {
	const operatorList = await models.SupportOperator.findAll({
		where: {
			Status: 1,
		},
		/* attributes: {
			include: [
				[
					sequelize.literal(
						'(SELECT Name FROM LevelScalation where LevelScalation.IdLevelScalation = supportOperators.IdLevelScalation)'
					),
					'NameLevel',
				],
			],
		}, */
	});
	return operatorList;
}

async function createOperator(params) {
	const operator = await models.SupportOperator.create({
		IdLevelScalation: params.levelscalation,
		Name: params.name,
		Email: params.email,
		Telephone: params.telephone,
		Status: 1,
	});
	return operator;
}

async function updateOperatorStatus(params) {
	console.log('Valor de params ', params);
	const updateOperatorStatus = models.SupportOperator.findOne({
		where: {
			IdSupportOPerators: params.IdSupportOPerators,
		},
	});
	if (!updateOperatorStatus) {
		throw 'No contract found';
	} else {
		const operator = models.SupportOperator.update(
			{
				Status: 0,
			},
			{
				where: {
					IdSupportOPerators: params.IdSupportOPerators,
				},
			}
		);
		return operator;
	}
}

async function editOperator(params) {
	console.log('Valor de params ', params);
	const editOperator = models.SupportOperator.findOne({
		where: {
			IdSupportOPerators: params.IdSupportOPerators,
		},
	});
	if (!editOperator) {
		throw 'No found';
	} else {
		const operator = models.SupportOperator.update(
			{
				IdLevelScalation: params.levelscalation,
				Name: params.name,
				Email: params.email,
				Telephone: params.telephone,
			},
			{
				where: {
					IdSupportOPerators: params.IdSupportOPerators,
				},
			}
		);
		return operator;
	}
}
