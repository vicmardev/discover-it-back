const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Role = require('helpers/role');
const alarmTimeout = require('assets/alarm.timeout');
const alarmService = require('services/alarm.service');
const {boolean} = require('joi');
const path = require('path');

module.exports = {
	getAllAlarms,
	getAlarmById,
	getAlarmByHostName,
	getByServiceName,
	getByAlarmStatus,
	updateSchema,
	updateAlarm,
	getHistoricalFilter,
	openTerminal,
	getAllHostServices,
	getHostServicesByHostId,
	getHostAlarmsByHostname,
	filterHosts,
	filterServices,
	filterHistorics,
	getNotifiers,
	counterHosts,
	getDevices,
	getTypeHosts,
	test,
};

function getAllHostServices(req, res, next) {
	alarmService
		.getAllHostServices()
		.then(hostList => res.json(hostList))
		.catch(next);
}

function getHostServicesByHostId(req, res, next) {
	alarmService
		.getHostServicesByHostId(req.params.id)
		.then(hostList => res.json(hostList))
		.catch(next);
}

function getHostAlarmsByHostname(req, res, next) {
	alarmService
		.getHostAlarmsByHostname(req.params.hostname)
		.then(hostList => res.json(hostList))
		.catch(next);
}

function getAllAlarms(req, res, next) {
	alarmService
		.getAllAlarms()
		.then(alarmList => res.json(alarmList))

		.catch(next);
}

function getHistoricalFilter(req, res, next) {
	let server = req.body.serverName;
	let partServer = req.body.ServiceName;
	alarmService
		.getHistoricAlarms(server, partServer)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function getAlarmById(req, res, next) {
	alarmService
		.getAlarmById(req.params.id)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function getAlarmByHostName(req, res, next) {
	alarmService
		.getAlarmByHostName(req.params.hostname)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function getByServiceName(req, res, next) {
	alarmService
		.getByServiceName(req.params.serviceName)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function getByAlarmStatus(req, res, next) {
	alarmService
		.getByAlarmStatus(req.params.status)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function updateSchema(req, res, next) {
	const schemaRules = {
		StartTime: Joi.date().empty(''),
		EndTime: Joi.date().empty(''),
		AlertType: Joi.string().empty(''),
		HostName: Joi.string().empty(''),
		ServiceName: Joi.string().empty(''),
		State: Joi.string().empty(''),
		StateType: Joi.string().empty(''),
		PluginOutput: Joi.string().empty(''),
		EquipmentSerial: Joi.string().empty(''),
		Resolved: Joi.boolean().empty(''),
	};
}

function updateAlarm(req, res, next) {
	if (req.user.role !== Role.Admin) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	alarmService
		.updateAlarm(req.params.id, req.body)
		.then(alarm => res.json(alarm))
		.catch(next);
}

function openTerminal(req, res, next) {
	alarmService
		.getConsola(req.params.programa)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function filterHosts(req, res, next) {
	alarmService
		.filterHosts()
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function filterServices(req, res, next) {
	alarmService
		.filterServices(req.params.idHost)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function filterHistorics(req, res, next) {
	alarmService
		.filterHistorics(req.params.idService)
		.then(alarmList => res.json(alarmList))
		.catch(next);
}

function getNotifiers(req, res, next) {
	alarmService
		.getNotifiers()
		.then(alarmNotifiers => res.json(alarmNotifiers))
		.catch(next);
}

function counterHosts(req, res, next) {
	alarmService
		.counterHosts()
		.then(counterHosts => res.json(counterHosts))
		.catch(next);
}

function getDevices(req, res, next) {
	alarmService
		.getDevices()
		.then(devices => res.json(devices))
		.catch(next);
}

function getTypeHosts(req, res, next) {
	alarmService
		.getTypeHosts()
		.then(types => res.json(types))
		.catch(next);
}

function test(req, res, next) {
	alarmService
		.test(req.params.hostname)
		.then(date => res.json(date))
		.catch(next);
}

/**
 * in milliseconds
 * 1000 = 1s
 * 60000 = 1 min
 * 300000 = 5 min
 * 360000
 */
alarmTimeout(60000);
