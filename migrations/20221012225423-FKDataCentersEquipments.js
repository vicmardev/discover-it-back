'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCentersEquipments ADD CONSTRAINT FK_DataCentersEquipments4 FOREIGN KEY (IdContractTime) REFERENCES ContractTime(IdContractTime) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCentersEquipments DROP CONSTRAINT  FK_DataCentersEquipments4;'
		);
	},
};
