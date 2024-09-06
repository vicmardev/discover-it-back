'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE EntryParts ADD CONSTRAINT FK_EntryParts FOREIGN KEY (IdPart) REFERENCES Parts(IdPart) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE EntryParts DROP CONSTRAINT  FK_EntryParts;'
		);
	},
};
