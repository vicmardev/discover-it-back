'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			"CREATE PROCEDURE `stp_GHostStatus`()      BEGIN      select count(case when statusCode = 'ok' then 1 else null end) as ok, count(case when statusCode = 'down' then 1 else null end) as down from Hosts;      END;"
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP PROCEDURE stp_GHostStatus;');
	},
};
