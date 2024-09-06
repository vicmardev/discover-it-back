const {json} = require('body-parser');
const config = require('config.json');
const sequelize = require('database/sequelize');
const {models} = require('database/sequelize');
const {model} = require('mongoose');
const toUpperCamelCase = require('../helpers/camelCase');

module.exports = {
	getAllSlas,
};
