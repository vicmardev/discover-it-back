const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		_id: {type: String},
		country_code: {type: Number},
		county_name: {type: String},
		type: {type: String},
	},
	{_id: false}
);

module.exports = mongoose.model('GeoCountries', schema);
