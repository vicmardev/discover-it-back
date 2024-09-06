const service = require('services/map-locations.service');

module.exports = {
	getStatesByCountryID,
	getCountryByCode,
	getCountries,
};

// Return list of existing countries to show in the map
function getCountries(req, res, next) {
	service
		.getCountries()
		.then(result => res.json(result))
		.catch(next);
}

function getStatesByCountryID(req, res, next) {
	service
		.getStatesByCountryID(req.params.id)
		.then(states => res.json(states))
		.catch(next);
}

function getCountryByCode(req, res, next) {
	service
		.getCountryByCode(req.params.code)
		.then(country => res.json(country))
		.catch(next);
}
