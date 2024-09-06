const {json} = require('body-parser');
const config = require('config.json');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');

module.exports = {
	getAllDataCenters,
	getDataCenterById,
	getDataCentersByData,
};

async function getAllDataCenters() {
	const dataCenterList = await models.DataCenter.findAll();
	return dataCenterList;
}

async function getDataCenterById(id) {
	const dataCenter = await models.DataCenter.findOne({
		where: {
			IdDataCenter: id,
		},
	});
	return dataCenter;
}

async function getDataCentersByData(data) {
	//DataCenter
	const dataCenter = await models.DataCenter.findOne({
		where: {
			DataCenter: data,
		},
		attributes:{
			exclude: ['updatedAt'],
			include:[
				[
					sequelize.literal(
						'(SELECT State FROM Cities WHERE Cities.IdCity = DataCenter.IdCity)'
					),
					'CityName',
				],
				[
					sequelize.literal(
						'(SELECT Name FROM Countries WHERE Countries.IdCountry = DataCenter.IdCountry)'
					),
					'CountryName',
				],
			]
		}
	});
	return dataCenter;
}
