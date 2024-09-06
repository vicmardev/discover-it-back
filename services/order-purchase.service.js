const config = require('config.json');
const Role = require('helpers/role');
const fs = require('fs');
const path = require('path');
const {throws} = require('assert');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const {BaseError} = require('sequelize');

const createOrder = async (params, files) => {
	var generalPath = '';
	if (files) {
		let file = files[0];
		let fileDir = `uploads/orders`;
		let filePath = `${fileDir}/${params.NumOrden}.pdf`;
		params.UrlOrderFile = filePath;
		generalPath = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});
	}

	try {
		const orderDate = await transformDate(params.DateReceptionEmail);
		const order = await models.Order.create({
			NumOrder: params.NumOrden,
			IdClient: params.NoProvider,
			DateReceptionEmail: orderDate,
			IdStatus: 2,
			IdBrand: params.IdBrand,
			IdTypePart: params.IdTypeEquipments,
			Comments: params.Comments,
			EmailUserFinal: params.EmailUserFinal,
			IdOwnerCompany: params.OwnCompany,
			TotalEquipments: params.TotalEquipments,
			Services: params.Services,
			User: params.User,
			UserClient: params.UserClient,
			UrlOrderFile: generalPath,
			Subtotal: params.Subtotal,
			StatusOrder: 1
		});
		return order;
	} catch (error) {
		throw error;
	}
};

async function updateOrder(params) {
	const result = {status: false, msg: '', data: {}};
	try {
		const updateOrder = models.Order.findOne({
			where: {
				IdOrder: params.IdOrder,
			},
		});
		if (!updateOrder) {
			throw 'No contract found';
		} else {
			result.data = models.Order.update(
				{
					IdStatus: params.IdStatus,
					Comments: params.Comments,
				},
				{
					where: {
						IdOrder: params.IdOrder,
					},
				}
			);
			result.status = true;
		}
	} catch (e) {
		if (e instanceof BaseError) {
			result.msg = e.parent.text;
		} else {
			throw e;
		}
	}
	return result;
}

async function editOrder(params) {
	const result = {status: false, msg: '', data: {}};
	try {
		const editOrder = models.Order.findOne({
			where: {
				IdOrder: params.IdOrder,
			},
		});
		if (!editOrder) {
			throw 'Order not found';
		} else {
			const orderDate = await transformDate(params.DateReceptionEmail);
			result.data = models.Order.update(
				{
					DateReceptionEmail: orderDate,
					User: params.User,
					UserClient: params.UserClient,
					EmailUserFinal: params.EmailUserFinal,
					OwnCompany: params.OwnCompany,
					IdBrand: params.IdBrand,
					IdTypeEquipments: params.IdTypeEquipments,
					TotalEquipments: params.TotalEquipments,
					Services: params.Services,
					Subtotal: params.Subtotal,
				},
				{
					where: {
						IdOrder: params.IdOrder,
					},
				}
			);
			result.status = true;
		}
	} catch (e) {
		if (e instanceof BaseError) {
			result.msg = e.parent.text;
		} else {
			throw e;
		}
	}
	return result;
}

async function deleteOrder(params) {
	const result = {status: false, msg: '', data: {}};
	try {
		const deleteOrder = models.Order.findOne({
			where: {
				IdOrder: params.IdOrder,
			},
		});
		if (!deleteOrder) {
			throw 'No contract found';
		} else {
			result.data = models.Order.update(
				{
					StatusOrder: 0,
				},
				{
					where: {
						IdOrder: params.IdOrder,
					},
				}
			);
			result.status = true;
		}
	} catch (e) {
		if (e instanceof BaseError) {
			result.msg = e.parent.text;
		} else {
			throw e;
		}
	}
	return result;
}

async function transformDate(date) {
	date = new Date(date);
	var now = date.toISOString().replace('T', ' ').replace('Z', '');
	return now;
}

async function getAllOrders() {
	try {
		const allOrders = models.Order.findAll({
			where: {
				StatusOrder: 1,
			},
			order: [['createdAt', 'DESC']],
			attributes: {
				include: [
					[
						sequelize.literal(
							'(SELECT Status FROM StatusGenerales Where StatusGenerales.IdStatus = Order.IdStatus)'
						),
						'Status',
					],
					[
						sequelize.literal(
							'(SELECT NameBrand FROM Brands Where Brands.IdBrand = Order.IdBrand)'
						),
						'Brand',
					],
					[
						sequelize.literal(
							'(SELECT Name FROM TypeParts Where TypeParts.IdTypePart = Order.IdTypePart)'
						),
						'TypePart',
					],
					[
						sequelize.literal(
							'(SELECT Name FROM OwnerCompany Where OwnerCompany.IdOwnerCompany = Order.IdOwnerCompany)'
						),
						'OwnerCompany',
					],
					[
						sequelize.literal(
							'(SELECT Name FROM Clients Where Clients.IdClient = Order.IdClient)'
						),
						'ClientName',
					],
				],
			},
		});
		return allOrders;
	} catch (error) {
		throw error;
	}
}

async function getHistory(params) {
	try {
		const history = models.OrderLog.findAll({
			where: {
				NumOrder: params,
			},
			attributes: {
				exclude: [
					'ProviderNumber',
					'Action',
					'UserClient',
					'TotalEquipments',
					'Services',
					'IdTypePart',
					'IdBrand',
				],
				include: [
					[
						sequelize.literal(
							'(SELECT Status FROM StatusGenerales Where StatusGenerales.IdStatus = OrderLog.IdStatus)'
						),
						'Status',
					],
				],
			},
		});
		return history;
	} catch (error) {
		throw error;
	}
}

async function getBrands() {
	try {
		const brands = models.Brand.findAll({});
		return brands;
	} catch (error) {
		throw error;
	}
}

async function getTypeParts() {
	try {
		const TypeParts = models.TypePart.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});
		return TypeParts;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createOrder,
	getAllOrders,
	getBrands,
	getTypeParts,
	updateOrder,
	deleteOrder,
	getHistory,
	editOrder,
};
