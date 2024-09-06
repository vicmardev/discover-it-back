const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize')
const Role = require('helpers/role');


const graphicController = require('controllers/graphic.controller');
router.get('/', authorize(),graphicController.getCountTickets);
router.get('/equipment',authorize(), graphicController.listEquipment);
router.get('/contract',authorize(),graphicController.listContract);
router.get('/contract/users',authorize(),graphicController.listUsersPerContract);
router.get('/fields/:field',authorize(),graphicController.listAllFields);
router.get('/user/:field',authorize(), graphicController.listAllFieldsUser);
router.get('/tickets/:field',authorize(), graphicController.listFieldsTickets);
router.get('/brandGraphic', authorize(),graphicController.graphicBrand);
router.get('/tickets',authorize(), graphicController.ticketsPerDay);


module.exports = router;    