const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema ({
  Time: {type: Date, required: true},
  Duration: String,
  //EndTime: Date,
  AlarmType: {type: String, required: false},
  Hostname: {type: String, required: false},
  Serial: {type: String, required: false},
  ServiceName: String,
  Status: {type: String, required: false},
  //StateType: {type: String, required: true},
  PluginOutput:  String,
  //EquipmentSerial: {type: String, require: true},
  //Resolved: {type: Boolean, require: true}
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
  }
});

module.exports = mongoose.model('Alarm', schema );