const {json} = require('body-parser');
const config = require('config.json');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const toUpperCamelCase = require('../helpers/camelCase');

module.exports = {
	getAllClients,
	createClient,
	updateClientStatus, //delete client
	editClient,
};

async function getAllClients() {
	const clientList = await models.Client.findAll({
		where: {
			Status: 1,
		},
	});
	return clientList;
}

async function createClient(params) {
	//params = toUpperCamelCase(params);
	const client = await models.Client.create({
		Name: params.name,
		Status: 1,
		Family: params.family,
		RazonSocial: params.razonsocial,
		AdressFiscal: params.adressfiscal,
		RFC: params.rfc,
		OrdenCompra: params.ordencompra,
	});
	return client;
}

/* async function updateClientStatus(id, params) {
	params.status = 'false';
	params = toUpperCamelCase(params);
	const client = await models.Client.findByPk(id);
	client.set(params);
	await client.save();
	return client;
} */

async function updateClientStatus(params) {
	console.log('Valor de params ', params);
	const updateClientStatus = models.Client.findOne({
		where: {
			IdClient: params.IdClient,
		},
	});
	if (!updateClientStatus) {
		throw 'No contract found';
	} else {
		const client = models.Client.update(
			{
				Status: 0,
			},
			{
				where: {
					IdClient: params.IdClient,
				},
			}
		);
		return client;
	}
}

async function editClient(params) {
	const editClient = models.Client.findOne({
		where: {
			IdClient: params.IdClient,
		},
	});
	if (!editClient) {
		throw 'No Found';
	} else {
		const client = models.Client.update(
			{
				Name: params.name,
				Family: params.family,
				RazonSocial: params.razonsocial,
				AdressFiscal: params.adressfiscal,
				RFC: params.rfc,
				OrdenCompra: params.ordencompra,
			},
			{
				where: {
					IdClient: params.IdClient,
				},
			}
		);
		return client;
	}
}
