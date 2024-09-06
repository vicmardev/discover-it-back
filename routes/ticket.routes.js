const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize')
const Role = require('helpers/role');

const ticketController = require('controllers/ticket.controller')

router.get('/', authorize(), ticketController.getAllTickets);
router.get('/:id', authorize(), ticketController.getTicketById);
router.post('/', authorize(), ticketController.createTicket);
router.put('/:id', authorize(Role.Admin), ticketController.updateTicket);
module.exports = router;