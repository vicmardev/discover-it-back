const config = require('config.json');
const db = require('database/db');
const Role = require('helpers/role');
const fs = require('fs');
const Queue = require('../helpers/queue.js');
const queue = new Queue();
const path = require('path');
const sendEmail = require('helpers/send-email');
const {throws} = require('assert');

async function getAllTicketAlertsGroupByOperator() {
	var today = new Date();
	today.setHours(0, 0, 0, 0);
	//const infoTicketsByOperator = db.TicketAlerts.aggregate([{$match : {ticketRegistrationDate: { $gte: today}}},{$group: {_id: "$supportAssignment", "tickets": {$sum:1}, userEmail : { $first: '$userEmail' }}}]);
	const infoTicketsByOperator = db.TicketAlerts.aggregate([
		{$match: {ticketRegistrationDate: {$gte: today}}},
		{$group: {_id: '$supportAssignment', tickets: {$sum: 1}}},
		{$sort: {tickets: -1, _id: -1}},
	]);
	//console.log(infoTicketsByOperator);
	return infoTicketsByOperator;
}

async function createTicketAlert(params) {
	let serial = params.Serial;
	const infoContrat = await db.Equipment.findOne({Serial: serial});
	ticketNum = await getNextSequence('alarmsId');
	let list = queue.isEmpty();
	if (list === false) {
		suport = queue.dequeue();
	} else {
		listSupport = ['Jose Luis Xolo', 'Juan Mejia', 'Alejandro Sánchez'];
		listSupport.forEach(element => {
			queue.enqueue(element);
		});
		suport = queue.dequeue();
	}
	if (!infoContrat) throw 'device not in contract';
	const ticketLI = {
		ticketID: `Tkt-${ticketNum}`,
		statusTicket: 'Pending',
		ticketRegistrationDate: new Date(),
		stepTicket: 3,
		titleTicket: `Incidencia en ${params.ServiceName}`,
		supportAssignment: suport,
		host: params.Hostname,
		affectedPart: params.ServiceName,
		statusHost: params.Status,
		dateAlert: new Date(),
		alertDuration: params.Duration,
		response: params.PluginOutput,
		contract: infoContrat.Contrato,
		brand: infoContrat.Brand,
		model: infoContrat.Model,
		serial: infoContrat.Serial,
		location: infoContrat.Address,
		userEmail: params.userEmail,
		userClient: params.userClient,
		userPhone: 123456789,
		SLA: infoContrat.SLA,
		ObservationSupport: '',
		ObservationResponseUser: '',
	};

	const ticket = new db.TicketAlerts(ticketLI);
	await ticket.save();
	return ticket;
}

async function getNextSequence(name) {
	const ret = await db.Counters.findOneAndUpdate(
		{_id: name},
		{$inc: {seq: 1}},
		{new: true}
	);

	return ret.seq;
}

async function getTicketAlertById(id) {
	if (!db.isValidId(id)) throw 'Ticket Alert not found';
	const ticketAlert = await db.TicketAlerts.findById(id);
	if (!ticketAlert) throw 'Ticket Alert not found';
	return ticketAlert;
}

async function getAllTicketAlerts() {
	const ticketAlertList = await db.TicketAlerts.find();
	return ticketAlertList;
}

async function getImage() {
	const image =
		'http://localhost:70/uploads/undefined/undefined/support/profile-git-1.png';
	return image;
}

const postResponse = async (params, files) => {
	var generalPath = '';
	if (files) {
		let file = files;
		let fileDir = `uploads/${params.userClient}/${params.contract}/support`;
		let filePath = `${fileDir}/${file.evidence.name}`;
		params.evidence = filePath;
		generalPath = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, file.evidence.data, 'binary', function (err) {
			if (err) throw err;
		});
	}
	try {
		let where = {ticketID: params.ticketID};
		let operation = {
			$set: {
				dateSolution: params.dateSolution,
				solution: params.solution,
				statusTicket: params.statusTicket,
				stepTicket: params.stepTicket,
				evidence: generalPath,
			},
		};

		const query = await db.TicketAlerts.updateOne(where, operation, {multi: true});
		return query;
	} catch (error) {
		throw error;
	}
};

async function updateTicketAlert(id, params, files) {
	const ticket = await getTicketAlertById(id);

	//save image if there is one
	if (files) {
		let file = files.evidenceReassig;
		let fileDir = `uploads/${params.userClient}/${params.contract}/support-reassign`;
		let filePath = `${fileDir}/${file.name}`;
		params.evidenceReassig = filePath;
		params.responsableReassig = 'Angel Leon';

		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});
	}
	// copy params to account and save
	Object.assign(ticket, params);
	await ticket.save();

	return ticket;
}

async function updateTicketFile(id, params, files) {
	const ticket = await getTicketAlertById(id);
	if (files) {
		let file = files.pdfFile;
		let fileDir = `uploads/${params.userClient}/${params.contract}/pdf-files`;
		let filePath = `${fileDir}/${file.name}`;
		params.pdfFile = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.write(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});
	}
	Object.assign(ticket, params);
	await ticket.save();
	return ticket;
}

async function updateTicketReassign(id, params, files) {
	//TODO: assign resonsableReassig from a FIFO data structure
	let ticket = updateTicketAlert(id, params, files);

	return basicDetails(ticket);
}

async function postQuestions(params) {
	let id = params.ticketID;
	if (params.statusTicket === 'Pending') {
		let observation = params.ObservationSupport;
		let operation = {
			$set: {
				ObservationSupport: observation,
				statusTicket: 'Paused',
				stepTicket: 2,
			},
		};
		const query = await db.TicketAlerts.updateOne({ticketID: id}, operation);
		/*  await sendEmail({
            to: params.userEmail,
            subject:  `Discover IT Ticket Pausado ${id} `,
            html: `<h4 style="color:#0099CC">El ticket se  pauso,se requieren atender las  observaciones solicitadas, 
            para continuar con el flujo del Ticket.</h4>
            <h5  style="color:#0099CC"> Observaciones: </h5><span>${observation}</span> <br> 
            <br>Dirigite DiscoverIT para  completar  la  información solicitada del  Ticket: <b style="color:#0099CC">${id}. </b>
            <br><a href="http://discoverit.virwo.com/">DiscoverIT</a>`
        }); */
		return query;
	} else {
		let observation = params.ObservationResponseUser;
		let operation = {
			$set: {
				ObservationResponseUser: observation,
				statusTicket: 'Tracking',
				stepTicket: 3,
			},
		};
		const query = await db.TicketAlerts.updateOne({ticketID: id}, operation);
		/* await sendEmail({
            to: params.userEmail,
            subject:  `Discover IT Ticket Seguimiento ${id} `,
            html: `<h4 style="color:#0099CC">El ticket tiene, nuevos comentarios agregados por  el  usuario.</h4>
            <h5  style="color:#0099CC"> Comentarios de usuario: </h5><span>${observation}</span> <br> 
            <br>Dirigite DiscoverIT para dar seguimiento del  Ticket: <b style="color:#0099CC">${id}. </b>
            <br><a href="http://discoverit.virwo.com/">DiscoverIT</a>`
        });    */
		return query;
	}
}

function basicDetails(ticketAlert) {
	const {
		_id,
		contrato,
		host,
		location,
		affectedPart,
		statusNagios,
		titleTicket,
		ticketRegistrationDate,
		step,
		userClient,
		userPhone,
		brand,
		model,
		serie,
		responsable,
	} = ticketAlert;
	return {
		_id,
		contrato,
		host,
		location,
		affectedPart,
		statusNagios,
		titleTicket,
		ticketRegistrationDate,
		step,
		userClient,
		userPhone,
		brand,
		model,
		serie,
		responsable,
	};
}

async function setTicketAlias(ticket, account, alias) {
	const usr = await db.Account.findOne({_id: account});
	if (!usr) throw `No account found`;
	if (usr.role != 'Admin') throw `Not authorized`;

	await db.TicketAlias.updateOne(
		{Ticket: ticket},
		{$set: {Ticket: ticket, Alias: alias}},
		{upsert: true}
	);

	const Aliases = await db.TicketAlias.find({Ticket: ticket});
	return Aliases;
}

module.exports = {
	createTicketAlert,
	getTicketAlertById,
	getAllTicketAlerts,
	updateTicketAlert,
	updateTicketReassign,
	postResponse,
	getImage,
	postQuestions,
	getAllTicketAlertsGroupByOperator,
	setTicketAlias,
};
