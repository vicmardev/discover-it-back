const {boolean} = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	//New parts
	//stockID: {type: String, unique: true, require: true},
	// type: {type: String, require: true},
	brand: {type: String, require: true},
	part: {type: String, require: true},
	model: {type: String, require: true},
	partNumber: {type: String, require: true},
	serialNumber: {type: String, require: true},
	quantity: {type: Number, require: true},
	invoice: {type: String, require: false},
	client: {type: String, require: false},
	contract: {type: String, require: false},
	ticket: {type: String, require: false},
	replaceDate: {type: Date, require: false},
	// description: {type: String, require: true},
	// dischargeDate: {type: Date,require: false},
	status: {type: Boolean, require: true},
	//supplier: {type: String, require: true},
	//Replaced parts
});

schema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret_id;
	},
});

module.exports = mongoose.model('Parts', schema);
