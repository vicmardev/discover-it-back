'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			"CREATE PROCEDURE `stp_GHostCount`()      BEGIN      select Hosts.idHost, Hosts.Hostname, count(case when Alarms.Status = 'ok' then 1 else null end) as ok,       count(case when Alarms.Status = 'warning' then 1 else null end) as warning,        count(case when Alarms.Status = 'critical' or Alarms.Status = 'unknown' then 1 else null end) as critical,        count(case when Alarms.Status = 'ok' or Alarms.Status = 'warning' or Alarms.Status = 'critical' or Alarms.Status = 'unknown' then 1 else null end) as total      from Hosts JOIN Services ON Services.HostId = Hosts.idHost JOIN Alarms ON Services.CurrentAlarmId = Alarms.IdAlarm group by Hosts.idHost;      END;"
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP PROCEDURE stp_GHostCount;');
	},
};
