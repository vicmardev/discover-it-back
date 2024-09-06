const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Faq's Model
const schema = new Schema({
    questionType: {type: String, required: true},
    question: {type: String, required: true},
    answer: {type: String, required: true},
    created: {type: Date, default: Date.now},
    status: { type: String, required: true },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});

module.exports = mongoose.model('Faq', schema);