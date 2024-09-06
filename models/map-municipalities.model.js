const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { type: String},
    type: { type: String},
    state_code: {type : Number},
    state_name: {type : String}
}, { _id: false });

module.exports = mongoose.model('Map_Municipalities', schema);