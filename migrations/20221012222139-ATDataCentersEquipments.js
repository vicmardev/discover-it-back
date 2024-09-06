'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCentersEquipments	ADD IdContractTime int	not null AFTER IdSLA ;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCentersEquipments	DROP COLUMN IdContractTime;;'
		);
	},
};
