const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const controller = require('controllers/map-geolocations.controller');

//router.get('/states/:id', controller.getStatesByCountryID);
//router.get('/municipalities/:id', controller.getMunicipalitiesByStateID);
router.get('/countries', controller.getCountries);
router.get('/countrygeo/:code', controller.getCountryByCode);

module.exports = router;
