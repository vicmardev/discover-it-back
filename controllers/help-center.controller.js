const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');

const helpCenterService = require('services/help-center.service');

module.exports = {
	getAllFaqs,
	getFaqById,
	createSchema,
	createFaq,
	updateSchema,
	updateFaq,
	updateFaqStatus,
	contactSupportSchema,
	contactSupport,
};

function getAllFaqs(req, res, next) {
	helpCenterService
		.getAllFaqs()
		.then(faqList => res.json(faqList))
		.catch(next);
}

function getFaqById(req, res, next) {
	helpCenterService
		.getFaqById(req.params.id)
		.then(faq => (faq ? res.json(faq) : res.sendStatus(404)))
		.catch(next);
}

function createFaq(req, res, next) {
	if (req.user.role !== Role.Admin) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	helpCenterService
		.createFaq(req.body)
		.then(faq => res.json(faq))
		.catch(next);
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		questionType: Joi.string().required(),
		question: Joi.string().required(),
		answer: Joi.string().required(),
		status: Joi.string.required(),
	});
	validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
	const schemaRules = {
		questiontype: Joi.string().required(),
		question: Joi.string().required(),
		response: Joi.string().required(),
		status: Joi.string(),
	};

	const schema = Joi.object(schemaRules);
	validateRequest(req, next, schema);
}

function updateFaq(req, res, next) {
	helpCenterService
		.updateFaq(req.params.id, req.body)
		.then(faq => res.json(faq))
		.catch(next);
}

function updateFaqStatus(req, res, next) {
	helpCenterService
		.updateFaqStatus(req.params.id, req.body)
		.then(faq => res.json(faq))
		.catch(next);
}

function contactSupportSchema(req, res, next) {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		company: Joi.string().required(),
		phone: Joi.string().required(),
		email: Joi.string().required(),
		message: Joi.string().required(),
	});
	validateRequest(req, next, schema);
}

function contactSupport(req, res, next) {
	helpCenterService
		.contactSupport(req.body, req.get('origin'))
		.then(() => res.json({message: 'Please check the email admin'}))
		.catch(next);
}
