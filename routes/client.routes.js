const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const clientController = require('controllers/client.controller');
const Role = require('helpers/role');

router.get('/clients', clientController.getAllClients);
router.post('/createClients', clientController.createClient);
router.put('/updateClientStatus', clientController.updateClientStatus);
router.put('/editClient', clientController.editClient);

module.exports = router;
