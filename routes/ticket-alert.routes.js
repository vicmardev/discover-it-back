/*
const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize')
const Role = require('helpers/role');
*/

const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');

const ticketAlertController = require('controllers/ticket-alert.controller');

router.post('/', ticketAlertController.createTicketAlert);
router.get('/group', ticketAlertController.getAllTicketAlertsGroupByOperator);
router.get('/', ticketAlertController.getAllTicketAlerts);
router.get('/:id', ticketAlertController.getTicketAlertById);
router.post('/response', ticketAlertController.postResponseTicketAlert);
router.post('/create', authorize(), ticketAlertController.createTicketAlert);
router.post('/questions', authorize(), ticketAlertController.postTicketQuestion);
router.get('/', authorize(), ticketAlertController.getAllTicketAlerts);
router.get('/:id', authorize(), ticketAlertController.getTicketAlertById);
router.put('/:id', authorize(), ticketAlertController.updateTicketAlert);
router.get('/', ticketAlertController.getImage);
router.post(
	'/alias',
	authorize(),
	ticketAlertController.aliasSchema,
	ticketAlertController.setTicketAlias
);

module.exports = router;
