const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const nagiosController = require('controllers/nagios.controller')

router.get('/get-hosts', authorize(), nagiosController.getHosts);
router.get('/get-services', authorize(), nagiosController.getServices);

module.exports = router;