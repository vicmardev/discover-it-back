const {boolean} = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	//create  Ticket
	ticketID: {type: String, unique: true, require: true},
	statusTicket: {type: String, require: true},
	status: {type: String, required: true},
	ticketRegistrationDate: {type: Date, default: Date.now},
	stepTicket: {type: Number, require: true},
	titleTicket: {type: String, required: false},
	supportAssignment: {type: String, require: true},
	assignedSupportOperator: {type: String},

	description: {type: String, required: true},
	//inventory
	alias: {type: String, require: false},
	contract: {type: String, required: true},
	brand: {type: String, require: true},
	model: {type: String, required: true},
	equipmentSerial: {type: String, require: true},
	adressEquipmet: {type: String, require: true},
	userName: {type: String, required: true},
	client: {type: String, required: true},
	email: {type: String, required: true},
	telephone: {type: String, required: true},
	equipment: {type: String, required: true},
	severity: {type: String, required: true},
	issueType: {type: String, required: true},
	clientEvidencePath: {type: String, require: true},
	created: {type: Date, default: Date.now},
	//response
	dateSolution: {type: Date},
	solution: {type: String, require: false},
	evidence: {type: String},
	responseComments: {type: String},
	responseDate: {type: Date},
	closeDate: {type: Date},
	supportEvidencePath: {type: String, require: true},

	affectationPart: {type: String, require: true},
	operatingSystem: {type: String, require: true},
	clientName: {type: String, require: true},
	//reassignment
	responsableReassig: {type: String},
	solutionReassig: {type: String},
	dateSolutionReassig: {type: Date},
	evidenceReassig: {type: String},
	reassignToOperator: {type: String},
	escalateToOperator: {type: String},
	responseEscalateTo: {type: String},
	stepTicket: {type: Number, require: true},
});

schema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		// remove these props when object is serialized
		delete ret._id;
	},
});

module.exports = mongoose.model('Ticket', schema);
