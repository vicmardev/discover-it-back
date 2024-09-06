const config = require('config.json');
const {object, date} = require('joi');
const db = require('database/db');
const Role = require('helpers/role');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
var child_process = require('child_process');
const {QueryTypes} = require('sequelize');

module.exports = {
	getAllAlarms,
	getAlarmById,
	getAlarmByHostName,
	getByServiceName,
	getByAlarmStatus,
	createAlarm,
	updateAlarm,
	getHistoricAlarms,
	getConsola,
	getAllHosts,
	getHostServicesByHostId,
	getAllHostServices,
	getHostServicesByHostname,
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
//alarm is created by server
async function createAlarm(params, todayDate) {
	const filter = {
		Time: {$lt: todayDate},
		AlarmType: params.AlarmType,
		Hostname: params.Hostname,
		ServiceName: params.ServiceName,
		Status: params.Status,
		PluginOutput: params.PluginOutput,
	};
	const alarm = await db.Alarm.findOneAndUpdate(filter, params, {
		new: true,
		upsert: true, // Make this update into an upsert
	});
	await alarm.save();
	return alarm;
}

async function updateAlarm(id, params) {
	const alarm = await getAlarmById(id);
	object.assign(alarm, params);
	await alarm.save();
	return alarm;
}
async function getAllAlarms() {
	return (alarmList = await db.Alarm.find());
}

async function getAllHosts(limit = 999, offset = 0) {
	const hosts = await models.Host.findAll({
		limit: limit,
		offset: offset,
	});
	return hosts;
}

async function getAllHostServices(limit = 999, offset = 0) {
	hosts = await models.Host.findAll({
		include: [
			{
				model: models.Service,
				as: 'Services',
				include: [
					{
						model: models.Alarm,
						as: 'CurrentAlarm',
					},
					{
						model: models.Alarm,
						as: 'AlarmList',
					},
				],
			},
		],
		limit: limit,
		offset: offset,
	});
	return hosts;
}

async function getHostServicesByHostname(hostname) {
	hosts = await models.Host.findOne({
		where: {Hostname: hostname},
		include: [
			{
				model: models.Service,
				as: 'Services',
				include: [
					{
						model: models.Alarm,
						as: 'CurrentAlarm',
					},
					// {
					//   model: models.Alarm,
					//   as: "AlarmList",
					// },
				],
			},
		],
	});
	return hosts;
}

async function getHostServicesByHostId(hostId) {
	hosts = await models.Service.findAll({
		where: {HostId: hostId},
		include: [
			{
				model: models.Alarm,
				as: 'CurrentAlarm',
			},
		],
	});
	return hosts;
}

async function updateHostImage(hostId, params, files) {
	if (files) {
		let file = files.hostImage;
		let fileDir = `uploads/hostImages`;
		let filePath = `${fileDir}/${params.Hostname}.png`;

		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});

		params.HostsImageUrl = filePath;
		try {
			const host = await models.Host.update(
				{HostsImageUrl: filePath},
				{where: {idHost: hostId}}
			);
			return host;
		} catch (error) {
			throw 'image not saved';
		}
	} else {
		throw 'No image file';
	}
}

async function getHostAlarmsByHostname(hostname) {
	hosts = await models.Host.findOne({
		where: {Hostname: hostname},
		include: [
			{
				model: models.Service,
				as: 'Services',
				include: [
					{
						model: models.Alarm,
						as: 'CurrentAlarm',
					},
					{
						model: models.Alarm,
						as: 'AlarmList',
					},
				],
			},
		],
	});
	return hosts;
}

async function getAlarmById(id) {
	if (!db.isValidId(id)) throw 'alarm not found';
	const alarm = await db.Alarm.findById(id);
	if (!alarm) throw 'alarm not found';
	return alarm;
}

async function getAlarmByHostName(hostName) {
	const alarmList = await db.Alarm.find({Hostname: hostName});
	if (!alarmList) throw 'No alarms found';
	return alarmList;
}

async function getByServiceName(serviceName) {
	const alarmList = await db.Alarm.find({ServiceName: serviceName});
	if (!alarmList) throw 'No alarms found';
	return alarmList;
}

async function getByAlarmStatus(status) {
	const alarmList = await db.Alarm.find({Status: status});
	if (!alarmList) throw 'No alarms found';
	return alarmList;
}

async function getHistoricAlarms(hostname, nameService) {
	try {
		const query = await db.Alarm.find({
			Hostname: hostname,
			ServiceName: nameService,
		});
		return query;
	} catch (error) {
		throw error;
	}
}
async function getConsola(programa) {
	try {
		if (programa === 'putty') {
			child_process.exec(
				'"C:/Program Files/PuTTY/putty.exe" -ssh alpha@172.16.2.1 -pw "alpha" ',
				function (error, stdout, stderr) {
					// "C:/Program Files (x86)/Mobatek/MobaXterm/MobaXterm.exe" -ssh root@169.63.184.115 -pw "Alpha_123"
					// "C:/Program Files/PuTTY/putty.exe"  -ssh root@169.63.184.115 -pw "Alpha_123"
					// moba "C:/Program Files (x86)/Mobatek/MobaXterm/MobaXterm.exe" -ssh root@169.63.184.115 -pw "Alpha_123"
				}
			);
		} else {
			child_process.exec(
				'"C:/Program Files (x86)/Mobatek/MobaXterm/MobaXterm.exe" -newtab "ssh -Alpha_123 ubuntu@169.63.184.115 -i "C:/Users/Ivan Pillado/Desktop/keys/discover_150.240.3.167/clave.ppk"" ',
				function (error, stdout, stderr) {}
			);
		}

		return 'ok';
	} catch (error) {}
}

async function assertDatabaseConnectionOk() {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();
	hosts = await models.Host.findAll({
		include: [
			{
				model: models.Service,
				as: 'Services',
				include: [
					{
						model: models.Alarm,
						as: 'CurrentAlarm',
					},
					{
						model: models.Alarm,
						as: 'AlarmList',
					},
				],
			},
		],
	});

	// hosts = await models.Service.findAll({raw: true});
	// hosts = await models.Alarm.findAll({raw: true});
}

async function filterHosts() {
	host = await sequelize.query('CALL `stp_GHostCount`()', {
		raw: false,
	});
	return host;
}

async function filterServices(idHost) {
	service = await sequelize.query('CALL stp_GServices( :_idHost )', {
		raw: false,
		replacements: {_idHost: idHost},
	});
	return service;
}

async function filterHistorics(idService) {
	service = await sequelize.query('CALL stp_GHistoricalServices( :_idService )', {
		raw: false,
		replacements: {_idService: idService},
	});
	return service;
}

async function getNotifiers() {
	notifiers = await sequelize.query('CALL stp_GAlarmCount()', {
		raw: false,
	});
	return notifiers;
}

async function counterHosts() {
	hosts = await models.Host.findAll({
		attributes: ['idHost', 'statusCode', 'typeHots'],
	});
	statusCode = await sequelize.query('CALL stp_GHostStatus()', {
		raw: false,
	});
	res = {
		total: hosts.length,
		ok: statusCode[0].ok,
		down: statusCode[0].down,
	};
	return res;
}

async function getDevices() {
	res = await sequelize.query('CALL stp_GDevices()', {
		raw: false,
	});
	return res;
}

async function getTypeHosts() {
	hosts = await models.Host.findAll({
		attributes: ['TypeHots'],
		group: ['TypeHots'],
	});
	return hosts;
}

function generateDatabaseDateTime(date) {
	return date.toISOString().replace('T', ' ').substring(0, 19);
}

async function test(hostname) {
	let okCount = [];
	let warningCount = [];
	let criticalCount = [];
	var datesListStart = [];
	var datesListEnd = [];

	//const dateStr = '2022-01-08';
	//var prueba = new Date(dateStr);

	let datenow = new Date();
	let olderDate = new Date();

	datenow.setHours(19, 0, 0, 0);
	let fecha = generateDatabaseDateTime(datenow);

	olderDate.setDate(olderDate.getDate() - 1);
	olderDate.setHours(19, 0, 0, 0);
	let fecha2 = generateDatabaseDateTime(olderDate);

	fecha = fecha.replace('00:00:00', '');
	fecha2 = fecha2.replace('00:00:00', '');

	datesListEnd.push(fecha);
	datesListStart.push(fecha2);

	for (let i = 0; i < 7; i++) {
		olderDate.setDate(olderDate.getDate() - 1);
		fecha2 = generateDatabaseDateTime(olderDate);
		fecha2 = fecha2.replace('00:00:00', '');

		datesListStart.push(fecha2);

		datenow.setDate(datenow.getDate() - 1);
		fecha = generateDatabaseDateTime(datenow);
		fecha = fecha.replace('00:00:00', '');
		datesListEnd.push(fecha);
	}
	datesListStart.reverse();
	datesListEnd.reverse();

	for (const day in datesListEnd) {
		service = await sequelize.query(
			'CALL stp_GAlarmsByCreatedAt( :_hostname, :_olderDate, :_today)',
			{
				raw: false,
				replacements: {
					_hostname: hostname,
					_olderDate: datesListStart[day],
					_today: datesListEnd[day],
				},
			}
		);
		okCount.push(service[0].ok);
		warningCount.push(service[0].warning);
		criticalCount.push(service[0].critical);
	}

	res = {
		dates: datesListStart,
		ok: okCount,
		warning: warningCount,
		critical: criticalCount,
	};
	return res;
}
