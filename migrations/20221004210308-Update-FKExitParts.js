module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE ExitParts ADD CONSTRAINT FK_ExitParts FOREIGN KEY (IdPart) REFERENCES Parts(IdPart) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE ExitParts DROP CONSTRAINT  FK_ExitParts;'
		);
	},
};
