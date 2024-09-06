const Sequelize = require('database/sequelize');
const {models} = require('database/sequelize');

module.exports = {
	createQuote,
	deleteQuote,
	updateQuote,
	getAllQuotes,
	getQuoteById,
	getCustomersQuotesSelectorValues,
};

async function createQuote(params) {
	//check that customer (client) exist
	const customer = models.Client.findByPk(params.IdCustomer);
	if (!customer) {
		throw `invalid customer Id.`;
	}
	//check that statusQuote exist
	const statusQuote = models.StatusQuote.findByPk(params.IdQuote);
	if (!statusQuote) {
		throw `invalid status quote Id.`;
	}

	//always create new quote
	const newQuote = await models.Quote.create(params);
	await newQuote.save();
	return newQuote;
}

async function updateQuote(id, params) {
	//check that quote exist
	const quote = await getQuoteById(id);
	if (!quote) {
		throw `invalid quote id.`;
	}

	//update quote
	quote.set(params);
	await quote.save();
	return quote;
}

async function getAllQuotes() {
	const quotes = await models.Quote.findAll({
		include: [
			{
				model: models.Client,
				attributes: [['IdClient', 'Id'], 'Name', 'Status'],
				as: 'Customer',
			},
			{model: models.StatusQuote, attributes: [['id', 'Id'], 'Status', 'Description']},
		],
		order: [['createdAt', 'DESC']],
	});
	return quotes;
}

async function getQuoteById(id) {
	const quote = await models.Quote.findByPk(id);
	return quote;
}

async function deleteQuote(id) {
	const quote = await models.Quote.findByPk(id);
	quote.destroy();
	return quote;
}

async function getCustomersQuotesSelectorValues() {
	const customers = await models.Client.findAll({
		attributes: [
			['IdClient', 'value'],
			['Name', 'viewValue'],
		],
	});
	const quotes = await models.StatusQuote.findAll({
		attributes: [
			['id', 'value'],
			['Status', 'viewValue'],
		],
	});

	const currencyList = await models.CurrencyList.findAll({
		where: {Status: true},
		attributes: [
			['IdCurrency', 'value'],
			['CurrencyCode', 'viewValue'],
		],
	});

	const status = await models.StatusGeneral.findAll({
		where: {Dashboard: 'Quote'},
		attributes: [
			['Status', 'value'],
			['Status', 'viewValue'],
		],
	});

	return {
		Customers: customers,
		Quotes: quotes,
		CurrencyList: currencyList,
		Status: status,
	};
}
