'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			"CREATE PROCEDURE `stp_GAlarmsByCreatedAt`(      IN `hostname` VARCHAR(50),      IN `olderDate` VARCHAR(50),      IN `today` VARCHAR(50)    )    BEGIN    select     count(case when Alarms.Status = 'ok' then 1 else null end) as ok,     count(case when Alarms.Status = 'warning' then 1 else null end) as warning,     count(case when Alarms.Status = 'critical' || Alarms.Status = 'unknown' then 1 else null end) as critical      from Hosts     JOIN Services ON Services.HostId = Hosts.idHost     JOIN Alarms ON Alarms.ServiceId = Services.IdService      where Hosts.Hostname = hostname     and Alarms.createdAt     BETWEEN olderDate AND today order by Alarms.createdAt;    END;"
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP PROCEDURE stp_GAlarmsByCreatedAt;');
	},
};
