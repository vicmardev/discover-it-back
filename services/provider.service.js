const {json} = require('body-parser');
const config = require('config.json');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const {model} = require('mongoose');
const toUpperCamelCase = require('../helpers/camelCase');

module.exports = {
	getAllproviders,
	createProvider,
	updateProviderStatus, //delete provider
	editProvider,
};

async function getAllproviders() {
	const providersList = await models.Provider.findAll({
		where: {
			Status: 1,
		},
	});
	return providersList;
}

async function createProvider(params) {
	const provider = await models.Provider.create({
		Name: params.name,
		Status: 1,
		NameContact: params.namecontact,
		PhoneContact: params.phonecontact,
		EmailContact: params.emailcontact,
		City: params.city,
		Country: params.country,
		Delegation: params.delegation,
		PostalCode: params.postalcode,
		InternalNumber: params.internalnumber,
		ExternalNumber: params.externalnumber,
		Comments: params.comments,
	});
	return provider;
}

async function editProvider(params) {
	const editProvider = models.Provider.findOne({
		where: {
			IdProvider: params.IdProvider,
		},
	});
	if (!editProvider) {
		throw 'No found';
	} else {
		const provider = models.Provider.update(
			{
				Name: params.name,
				NameContact: params.namecontact,
				PhoneContact: params.phonecontact,
				EmailContact: params.emailcontact,
				City: params.city,
				Country: params.country,
				Delegation: params.delegation,
				PostalCode: params.postalcode,
				InternalNumber: params.internalnumber,
				ExternalNumber: params.externalnumber,
				Comments: params.comments,
			},
			{
				where: {
					IdProvider: params.IdProvider,
				},
			}
		);
		return provider;
	}
}

async function updateProviderStatus(params) {
	const updateProviderStatus = models.Provider.findOne({
		where: {
			IdProvider: params.IdProvider,
		},
	});
	if (!updateProviderStatus) {
		throw 'No found';
	} else {
		const provider = models.Provider.update(
			{
				Status: 0,
			},
			{
				where: {
					IdProvider: params.IdProvider,
				},
			}
		);
		return provider;
	}
}
