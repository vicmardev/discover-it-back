const config = require('config.json');
const db = require('database/db');
const Role = require('helpers/role');
const fs = require('fs');
const sendEmail = require('helpers/send-email');
const {models} = require('database/sequelize');
const toUpperCamelCase = require('../helpers/camelCase');

module.exports = {
	getAllFaqs,
	getFaqById,
	createFaq,
	updateFaq,
	updateFaqStatus,
	contactSupport,
};

async function getAllFaqs() {
	const faqList = await models.Faq.findAll({
		where: {Status: 'true'},
		raw: true,
	});
	const reducedFaqList = faqList.reduce((prevFaq, faq) => {
		const questionId = faq.Questiontype;
		prevFaq[faq.Questiontype] = prevFaq[faq.Questiontype] || [];
		prevFaq[faq.Questiontype]._id = questionId;
		prevFaq[faq.Questiontype].push(faq);
		return prevFaq;
	}, {});

	let groupedFaqList = [];
	for (let key of Object.keys(reducedFaqList)) {
		const tempFaq = {_id: key, questions: reducedFaqList[key]};
		groupedFaqList.push(tempFaq);
	}

	return groupedFaqList;
}

async function getFaqById(id) {
	if (!db.isValidId(id)) throw 'Faq not found';
	const faq = await db.Faq.findById(id);
	if (!faq) throw 'Faq not found';
	return faq;
}

async function createFaq(params) {
	params = toUpperCamelCase(params);
	const faq = await models.Faq.create(params);
	return faq;
}

async function updateFaq(id, params) {
	params = toUpperCamelCase(params);
	const faq = await models.Faq.findByPk(id);
	console.log(faq);
	faq.set(params);
	await faq.save();
	return faq;
}

async function updateFaqStatus(id, params) {
	params.status = 'false';
	params = toUpperCamelCase(params);
	const faq = await models.Faq.findByPk(id);
	faq.set(params);
	await faq.save();
	return faq;
}

function basicDetails(faq) {
	const {_id, questionType, question, answer, created, status} = faq;
	return {
		_id,
		questionType,
		question,
		answer,
		created,
		status,
	};
}

async function contactSupport(body, origin) {
	let message;
	if (origin) {
		message = `<p>Usted tiene una petición, con la  siguiente información.
         <h4>Datos de  contacto de la  solicitud:</h4>
         <span style="color:#0099CC">Usuario: </span>  ${body.firstName}<br>
         <span style="color:#0099CC">Compañia: </span>  ${body.company}<br>
         <span style="color:#0099CC">Correo: </span>  ${body.email}<br>
         <span style="color:#0099CC">Telefono: </span>${body.phone} <br>
         <span style="color:#0099CC">Mensaje: </span>${body.message} <br>
        </p><br>
        <p style="text-align: center"> Agradecemos su pronta respuesta.</p>`;
	} else {
		message = `<p>Esta en una prueba del correo que no llego</p>`;
	}

	await sendEmail({
		to: 'discoverIT@virwo.com',
		subject: 'Atención personalizada',
		html: `<h4>Atención personalizada</h4>${message}`,
	});
}
