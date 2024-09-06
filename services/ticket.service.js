const config = require('config.json');
const db = require('database/db');
const Role = require('helpers/role');
const fs = require('fs');
module.exports = {
	getAllTickets,
	getTicketById,
	getTicketByTicketId,
	createTicket,
	updateTicket,
	updateTicketReassign,
};

async function getAllTickets() {
	const ticketList = await db.Ticket.find();

	for (let i = 0; i < ticketList.length; i++) {
		let ticket = ticketList[i];
		let alias = await getTicketAlias(ticket.ticketID);
		if (!alias) continue;
		ticket.alias = alias.Alias;
	}
	return ticketList;
}

async function getTicketAlias(ticket, usrId) {
	const alias = await db.TicketAlias.findOne({Ticket: ticket});
	return alias;
}

async function getTicketById(id) {
	if (!db.isValidId(id)) throw 'ticket not found';
	const ticket = await db.Ticket.findById(id);
	if (!ticket) throw 'ticket not found';
	return ticket;
}

async function getTicketByTicketId(id) {
	const ticket = await db.Ticket.findOne({ticketID: id});
	if (!ticket) throw 'ticket not found';
	return ticket;
}

async function createTicket(params, files) {
	// Get current Date and get only day, month, year
	currentTime = new Date();
	year = currentTime.getFullYear();
	day = currentTime.getDate();
	month = currentTime.getMonth() + 1;

	// Set the format date (Day : '00', Month : '00');
	day = day < 10 ? '0' + day : day;
	month = month < 10 ? '0' + month : month;

	// validate
	if (await db.Ticket.findOne({ticketID: params.ticketID})) {
		throw 'ticket ID "' + params.ticketID + '" is already registered';
	}
	// Set client name with CAPITAL LETTERS
	upper = params.clientName;
	upper = upper.toUpperCase();

	// RE: To find first letter in each word.
	abrv = upper.replace(/[A-Za-z]+/g, function (match) {
		return match.trim()[0];
	});

	// Generate the seq.
	ticketNum = await getNextSequence('ticket');

	// Set the ticket format (009, 099, 999)
	ticketNum = ticketNum < 10 ? '00' + ticketNum : ticketNum;
	ticketNum = ticketNum < 100 ? '0' + ticketNum : ticketNum;

	// Merge the ticket ID
	params.ticketID = abrv.replace(/\s/g, '') + '-' + ticketNum + day + month + year;

	params.status = 'Pending';
	params.stepTicket = 3;

	if (files) {
		let file = files.fileUpload;
		let fileDir = `uploads/${params.client}/${params.contract}/${params.ticketID}`;
		let filePath = `${fileDir}/${file.name}`;
		params.clientEvidencePath = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});
	}

	const ticket = new db.Ticket(params);
	// save equipment
	await ticket.save();

	return ticket;
}

async function updateTicket(id, params, files) {
	const ticket = await getTicketById(id);
	//save image if there is one
	if (files) {
		let file = files.fileUpload;
		let fileDir = `uploads/${params.client}/${params.contract}/${params.ticketID}/support`;
		let filePath = `${fileDir}/${file.name}`;
		params.supportEvidencePath = filePath;
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

async function updateTicketReassign(id, params, files) {
	//TODO: assign resonsableReassig from a FIFO data structure
	params.responsableReassig = 'Angel Leon';
	//save image if there is one
	let ticket = updateTicket(id, params, files);

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

function basicDetails(ticket) {
	const {
		id,
		ticketID,
		equipment,
		model,
		title,
		description,
		severity,
		client,
		issueType,
		userName,
		contract,
		email,
		telephone,
		assignedSupportOperator,
		status,
		equipmentSerial,
		created,
		responseComments,
		responseDate,
		closeDate,
		clientEvidencePath,
		supportEvidencePath,
	} = ticket;
	return {
		id,
		ticketID,
		equipment,
		model,
		title,
		description,
		severity,
		client,
		issueType,
		userName,
		contract,
		email,
		telephone,
		assignedSupportOperator,
		status,
		equipmentSerial,
		created,
		responseComments,
		responseDate,
		closeDate,
		clientEvidencePath,
		supportEvidencePath,
	};
}
