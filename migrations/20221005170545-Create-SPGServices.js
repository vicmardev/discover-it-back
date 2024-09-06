'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'CREATE PROCEDURE `stp_GServices`(        IN `idHostSer` INT      )      BEGIN            Select Services.idService, Services.Name, Alarms.Status, Alarms.Attemps, Alarms.Duration from Hosts JOIN Services ON Services.HostId = Hosts.idHost      JOIN Alarms ON Services.CurrentAlarmId = Alarms.IdAlarm where Hosts.idHost = idHostSer;      END;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP PROCEDURE stp_GServices;');
	},
};
