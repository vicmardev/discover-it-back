const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');

const quoteController = require('controllers/quote.controller');

router.get('/', authorize(Role.Admin), quoteController.getAllQuotes);

router.get('/:id', authorize(Role.Admin), quoteController.getQuoteById);
router.delete('/:id', authorize(Role.Admin), quoteController.deleteQuote);

router.post(
	'/',
	authorize(Role.Admin),
	quoteController.createSchema,
	quoteController.createQuote
);

router.put(
	'/:id',
	authorize(Role.Admin),
	quoteController.updateSchema,
	quoteController.updateQuote
);

module.exports = router;
