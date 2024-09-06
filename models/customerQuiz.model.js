const { boolean, string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({

    ticketID: {type: String, require: true},
    dateQuiz: {type: Date, default:Date.now},
    client: {type: String, required: true},
    supportAssignment:{type: String, require: true},
    satisfaction: {type: String, require: true},
    responseTimeSatisfaction: {type: String, require: true},
    treatmentSatisfaction: {type: String, require: true},
    rating: {type: Number, require: true},
    comments: {type: String, require: false},

});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('Quiz', schema);