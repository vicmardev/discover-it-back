const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const schema = new Schema ({
    //create  Ticket
    ticketID: {type: String, unique: true, require: true},
    statusTicket: {type: String, require: true},
    ticketRegistrationDate: {type: Date, default: Date.now },
    stepTicket: {type: Number, require: true },
    titleTicket: {type: String, require: true},
    supportAssignment:{type: String, require: true},

    //nagios  info
    host: {type: String, require: true},
    affectedPart: {type: String, require: true},
    statusHost: {type: String, require: true},
    dateAlert: {type: Date},
    alertDuration: {type: String},
    response:{type: String, require: true},

    //inventory
    contract: {type: String, require: true},
    brand: {type: String, require: true},
    model: {type: String, require: true},
    serial: {type: String, require: true},
    location: {type: String, require: true},
    userClient: {type: String, require: true},
    userPhone: {type: String, require: true},
    userEmail: {type: String, require: true},
   //response
    dateSolution: {type: Date},
    solution: {type: String, require: false},
    evidence: {type:String},
    //reassignment
    responsableReassig: {type: String},
    solutionReassig: {type: String},
    dateSolutionReassig: {type: Date},
    evidenceReassig: {type:String},
    SLA: { type: String, required: false },
    ObservationSupport:{type:String, require:true},
    ObservationResponseUser:{type:String, require:true}
});

schema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});

module.exports = mongoose.model('TicketAlerts', schema);