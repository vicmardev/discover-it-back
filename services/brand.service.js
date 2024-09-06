const {json} = require('body-parser');
const config = require('config.json');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const {model} = require('mongoose');
const toUpperCamelCase = require('../helpers/camelCase');

module.exports = {
	getAllBrands,
	createBrand,
	updateBrandStatus, //delete brand
	editBrand,
};

async function getAllBrands() {
	const brandList = await models.Brand.findAll({
		where: {
			Status: 1,
		},
	});
	return brandList;
}

async function createBrand(params) {
	console.log('Valor de params: ', params);
	const brand = await models.Brand.create({
		NameBrand: params.namebrand,
		Status: 1,
		Description: params.description,
	});
	return brand;
}

async function updateBrandStatus(params) {
	console.log('Valor de params ', params);
	const updateBrandStatus = models.Brand.findOne({
		where: {
			IdBrand: params.IdBrand,
		},
	});
	if (!updateBrandStatus) {
		throw 'No found';
	} else {
		const brand = models.Brand.update(
			{
				Status: 0,
			},
			{
				where: {
					IdBrand: params.IdBrand,
				},
			}
		);
		return brand;
	}
}

/* async function editBrand(id, body) {
	const brand = await getBrandById(id);
	if (!brand) {
		throw 'invalido';
	}

	brand.set(body);
	await brand.save();
	return brand;
} */

async function editBrand(params) {
	console.log('Valor de params ', params);
	const editBrand = models.Brand.findOne({
		where: {
			IdBrand: params.IdBrand,
		},
	});
	if (!editBrand) {
		throw 'No found';
	} else {
		const brand = models.Brand.update(
			{
				NameBrand: params.namebrand,
				Description: params.description,
			},
			{
				where: {
					IdBrand: params.IdBrand,
				},
			}
		);
		return brand;
	}
}
