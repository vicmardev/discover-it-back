const express = require('express');
const router = express.Router();
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const alarmController = require('controllers/alarm.controller');
const Role = require('helpers/role');

//these 3 use sql

router.get('/host', authorize(), alarmController.getAllHostServices);
//router.get('/host/:hostname', authorize(), alarmController.getHostServicesByHostname);
router.get('/hostAlarm/:hostname', authorize(), alarmController.getHostAlarmsByHostname);

//SQL Historics Methods.
router.get('/filterHosts', alarmController.filterHosts);
router.get('/filterServices/:idHost', alarmController.filterServices);
router.get('/filterHistorics/:idService', alarmController.filterHistorics);
router.get('/notifiers', alarmController.getNotifiers);

//SQL DevicesStastics Methods.
//router.get('/counterhosts', alarmController.counterHosts);
router.get('/devices', alarmController.getDevices);
router.get('/typeHosts', alarmController.getTypeHosts);
router.get('/weekAlarms/:hostname', alarmController.test);

router.get('/service/:serviceName', authorize(), alarmController.getByServiceName);
router.get('/status/:status', authorize(), alarmController.getByAlarmStatus);
router.put(
	'/:id',
	authorize(Role.Admin),
	alarmController.updateSchema,
	alarmController.updateAlarm
);
router.post('/historical', alarmController.getHistoricalFilter);
router.get('/consola/:programa', alarmController.openTerminal);
+router.get('/', alarmController.getAllHostServices);
router.get('/:id', authorize(), alarmController.getAlarmById);
module.exports = router;
