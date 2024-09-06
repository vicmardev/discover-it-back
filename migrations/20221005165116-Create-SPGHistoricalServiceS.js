'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'CREATE PROCEDURE `stp_GHistoricalServices`(        IN `idServices` INT      )      BEGIN      Select Alarms.Status, Alarms.createdAt, Alarms.Duration from Services      JOIN Alarms ON Services.idService = Alarms.ServiceId WHERE Services.idService = idServices;            END;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP PROCEDURE stp_GHistoricalServices;');
	},
};
