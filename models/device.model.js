const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Serial: { type: String, unique: true, required: true },
    Brand: { type: String, required: true },
    City: { type: String, required: true },
    Address: { type: String, required: true },
    Contrato: { type: String, required: true },
    Equipment:{ type: String, required: true },
    Model: { type: String, required: true },
    SLA: { type: String, required: true },
    ServiceTag: { type: String, required: false },
    Start:{ type: Date, required: true },
    End: { type: Date, required: true },
    Status: { type: String, required: true } ,
    CommentsDelete: { type: String, required: false } ,
    User: { type: String, required: false } ,
    DateDelete: { type: Date, default: Date.now },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('Equipment', schema);