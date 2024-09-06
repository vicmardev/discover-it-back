const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  _id: String,
  seq: Number
},{ _id: false });

module.exports = mongoose.model('Counters', schema );