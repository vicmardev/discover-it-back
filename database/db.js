const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
console.log(config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
	Account: require('models/account.model'),
	Alarm: require('models/alarm.model'),
	Equipment: require('models/device.model'),
	RefreshToken: require('models/refresh-token.model'),
	Ticket: require('models/ticket.model'),
	Counters: require('models/counters.model'),
	KnowledgeBaseNodes: require('models/knowledge-base.model'),
	Faq: require('models/help-center.model'),
	ContractAlias: require('models/contract-alias.model'),
	TicketAlias: require('models/ticket-alias.model'),
	TicketAlerts: require('models/ticket-alert.model'),
	Quiz: require('models/customerQuiz.model'),
	Parts: require('models/parts-werehouse.model'),
	MapMunicipality: require('models/map-municipalities.model'),
	GeoCountries: require('models/geocountry.mongo.model'),
	Contract: require('models/contract.model'),
	isValidId,
};

function isValidId(id) {
	return mongoose.Types.ObjectId.isValid(id);
}
