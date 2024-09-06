'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			"CREATE PROCEDURE `stp_GDevices`()      BEGIN      select Hostname, TypeHots, count(case when statusCode = 'ok' then 1 else null end) as ok, count(case when statusCode = 'down' then 1 else null end) as down from Hosts group by Hostname;      END;"
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP PROCEDURE stp_GDevices;');
	},
};
