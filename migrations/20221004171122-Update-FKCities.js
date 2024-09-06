'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Cities ADD CONSTRAINT FK_Cities FOREIGN KEY (IdCountry) REFERENCES Countries(IdCountry) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Cities DROP CONSTRAINT  FK_Cities;'
		);
	},
};
