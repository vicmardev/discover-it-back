const { boolean, string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  type: {type: String, required: true},
  filepath: {type: String, required: false},
  ancestors: [String],
  parent: String
},{ _id: false });

module.exports = mongoose.model('KnowledgeBaseNode', schema );