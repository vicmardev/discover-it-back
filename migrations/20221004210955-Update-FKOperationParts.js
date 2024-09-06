'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE OperationParts ADD CONSTRAINT FK_OperationParts FOREIGN KEY (IdPart) REFERENCES Parts(IdPart) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_OperationParts2 FOREIGN KEY (IdRack) REFERENCES RacksStores(IdRack) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE OperationParts DROP CONSTRAINT  FK_OperationParts, DROP CONSTRAINT  FK_OperationParts2;'
		);
	},
};
