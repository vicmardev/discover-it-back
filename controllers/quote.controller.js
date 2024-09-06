const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const quoteService = require('services/quote.service');

module.exports = {
	createSchema,
	deleteQuote,
	createQuote,
	updateSchema,
	updateQuote,
	getAllQuotes,
	getQuoteById,
};

function getAllQuotes(req, res, next) {
	quoteService
		.getAllQuotes()
		.then(quote => res.json(quote))
		.catch(next);
}

function getAllQuotes(req, res, next) {
	switch (req.query.selector) {
		case 'customers' || 'quotes':
			quoteService
				.getCustomersQuotesSelectorValues()
				.then(selectors => res.json(selectors))
				.catch(next);
			break;

		default:
			quoteService
				.getAllQuotes()
				.then(quote => res.json(quote))
				.catch(next);
			break;
	}
}
deleteQuote;

function deleteQuote(req, res, next) {
	quoteService
		.deleteQuote(req.params.id)
		.then(quote => res.json(quote))
		.catch(next);
}

function getQuoteById(req, res, next) {
	quoteService
		.getQuoteById(req.params.id)
		.then(quote => res.json(quote))
		.catch(next);
}
function createSchema(req, res, next) {
	const schema = Joi.object({
		IdCustomer: Joi.number().required(),
		IdQuote: Joi.number().required(),
		Lead: Joi.string().required(),
		Currency: Joi.string().required(),
		Subtotal: Joi.string().required(),
		IVA: Joi.number().required(),
		Total: Joi.string().required(),
		Status: Joi.string().required(),
		Remark: Joi.string().allow(null, ''),
		Folio: Joi.string().required(),
		UrlFile: Joi.string().allow(null, ''),
	});
	validateRequest(req, next, schema);
}

function createQuote(req, res, next) {
	quoteService
		.createQuote(req.body)
		.then(quote => res.json(quote))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schema = Joi.object({
		IdCustomer: Joi.number(),
		IdQuote: Joi.number(),
		Lead: Joi.string(),
		Currency: Joi.string(),
		Subtotal: Joi.number(),
		IVA: Joi.number(),
		Total: Joi.number(),
		Status: Joi.string().required(),
		Remark: Joi.string(),
		Folio: Joi.string(),
		UrlFile: Joi.string(),
	});
	validateRequest(req, next, schema);
}

function updateQuote(req, res, next) {
	quoteService
		.updateQuote(req.params.id, req.body)
		.then(quote => res.json(quote))
		.catch(next);
}
