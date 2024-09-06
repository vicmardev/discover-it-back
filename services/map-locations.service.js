const db = require('database/db');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const {json} = require('body-parser');

module.exports = {
	getCountries,
	getCountryByCode,
	getMunicipalitiesByStateID,
};

// Gets list of countries with at least one datacenter/contract
async function getCountries() {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await models.DataCenter.findAll({
			attributes: [[sequelize.fn('DISTINCT', sequelize.col('country')), 'CountryCode']],

			include: [
				{
					as: 'Country',
					model: models.Country,
					//where: {IdCountry: 'DataCenter.CountryCode'},
				},
			],
			logging: console.log,
		});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontró un error al obtener la lista de Paises';
		console.log(e);
	}
	return result;
}

async function getMunicipalitiesByStateID(state) {
	const municipalities = await db.MapMunicipality.findOne({state_code: state});
	if (!municipalities) throw 'State not found';
	return municipalities;
}

async function getStatesByCountryID(country) {
	//const states = await db.MapMunicipality.findOne({ country_code: state });
	//if (!municipalities) throw "State not found";
	//return municipalities;
}

async function getCountryByCode(code) {
	const result = {status: false, msg: '', data: {}};
	try {
		result.data = await db.GeoCountries.find({country_code: code});
		result.status = true;
	} catch (e) {
		result.msg = 'Se encontró un error al obtener la lista de Paises';
		console.log(e);
	}
	return result;
}
