const {SSL_OP_EPHEMERAL_RSA} = require('constants');
const fs = require('fs');
const Host = require('assets/host');
const Service = require('assets/service');

module.exports = {
	getHosts,
	getServices,
};

const nagiosStatusTypes = {
	host: {
		ok: 0,
		down: 1,
		unreachable: 2,
	},
	service: {
		ok: 0,
		warning: 1,
		critical: 2,
		unknown: 3,
	},
};

async function getHosts(statusFile) {
	let status;
	try {
		status = await (await readStatusFile(statusFile)).toString();
	} catch {
		return [];
	}
	const regex = /(hoststatus) {([^}]*)*\s}/g;
	const atributeRegex =
		/(host_name|current_state|current_notification_number|problem_has_been_acknowledged)=.*/g;
	let hostMatches = status.match(regex);
	hostArray = [];

	for (let host of hostMatches) {
		let matches = host.match(atributeRegex);
		hostData = {};
		for (let match of matches) {
			strings = match.toString().split('=');
			hostData[strings[0]] = strings[1];
		}
		hostArray.push(
			new Host(
				hostData['host_name'],
				hostData['current_state'],
				hostData['current_notification_number'],
				hostData['problem_has_been_acknowledged']
			)
		);
	}

	return hostArray;
}

async function getServices(statusFile) {
	let status;
	try {
		status = await (await readStatusFile(statusFile)).toString();
	} catch {
		return [];
	}
	const regex = /(servicestatus) {([^}]*)*\s}/g;
	const atributeRegex =
		/(host_name|service_description|current_state|last_state_change|current_attempt|max_attempts|current_notification_number|plugin_output?|problem_has_been_acknowledged)=.*/g;
	let serviceMatches = status.match(regex);
	serviceArray = [];

	/* */
	for (let service of serviceMatches) {
		let matches = service.match(atributeRegex);
		let serviceData = {};
		let isLongPluginOutput = false;
		for (let match of matches) {
			strings = match.toString().split('=');
			//deals with double result due to long_plugin_output and plugin_output in the file
			if (strings[0] == 'plugin_output') {
				if (isLongPluginOutput) {
					isLongPluginOutput = !isLongPluginOutput;
				} else {
					pluginOutputString = strings[1];
					//brings string after first = back together
					for (i = 2; i < strings.length; i++) {
						pluginOutputString += ' = ' + strings[i];
					}
					serviceData[strings[0]] = pluginOutputString;
					isLongPluginOutput = !isLongPluginOutput;
				}
			} else {
				serviceData[strings[0]] = strings[1];
			}
		}
		serviceArray.push(
			new Service(
				serviceData['host_name'],
				serviceData['service_description'],
				serviceData['current_state'],
				serviceData['last_state_change'],
				serviceData['current_attempt'].toString() +
					'/' +
					serviceData['max_attempts'].toString(),
				serviceData['plugin_output'],
				serviceData['current_notification_number'],
				serviceData['problem_has_been_acknowledged']
			)
		);
	}

	return serviceArray;
	//*/
}

async function readStatusFile(statusFile) {
	let status = fs.promises.readFile(statusFile, 'utf8');
	return status;
}
