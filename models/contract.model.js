const {boolean} = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    contractNumber:{type: String, unique: true, require: true},
    dateContract:{type: Date, default: Date.now},
    numberCustomer:{ type: String, require: true },
    customerInformation:{type: String, require: true},
    finalCustomer: {type: String, require: true},
    startDateContract:{ type: Date, require: true},
    endDateContract:{type: Date, require: true},
    pathZip: {type:String}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id
    }
});

module.exports = mongoose.model('Contract', schema)