const {models} = require('database/sequelize');

module.exports = {
	getTypePartsName,
	getChasis,
	getComponentsChasis,
};

async function getTypePartsName() {
	const query = await models.TypePart.findAll({
		where: {Status: 1},
		attributes: ['Name'],
	});
	res = {
		status: 200,
		msg: 'peticion correcta',
		data: query,
	};
	return res;
	/* res.status(200).send(query);
	res.status(200).send({message : 'algo'}); */
}

async function getChasis(queryParams) {
	const IP = queryParams.ip;
	const type = queryParams.type;

	const query = await models.ChasisEquipment.findAll({
		where: {Ip: IP, Type: type},
		include: [
			{
				model: models.ComponentChasis,
			},
		],
	});
	return query;
}

async function getComponentsChasis(req) {
	const idChasis = req.params.id;
	const query = await models.ComponentChasis.findAll({
		where: {IdChasis: idChasis},
	});
	return query;
}
