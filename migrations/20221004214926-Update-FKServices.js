'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Services ADD CONSTRAINT FK_Services FOREIGN KEY (CurrentAlarmId) REFERENCES Alarms(IdAlarm) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Services DROP CONSTRAINT  FK_Services;'
		);
	},
};
