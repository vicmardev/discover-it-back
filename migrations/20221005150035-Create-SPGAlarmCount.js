'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'CREATE PROCEDURE `stp_GAlarmCount`()    BEGIN    Select Alarms.Status, COUNT(*) as total from Services JOIN Alarms ON Services.CurrentAlarmId=Alarms.IdAlarm group by Alarms.Status;    END;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP PROCEDURE stp_GAlarmCount;');
	},
};
