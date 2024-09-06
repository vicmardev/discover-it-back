const {boolean} = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	UserId: {type: String, required: false},
	Ticket: {type: String, required: true},
	Alias: {type: String, required: false},
});

schema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
	},
});

module.exports = mongoose.model('TicketAlias', schema);
