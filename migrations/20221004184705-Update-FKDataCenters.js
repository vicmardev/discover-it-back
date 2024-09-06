'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCenters ADD CONSTRAINT FK_DataCenters FOREIGN KEY (City) REFERENCES Cities(IdCity) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_DataCenters2 FOREIGN KEY (Country) REFERENCES Countries(IdCountry) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCenters DROP CONSTRAINT  FK_DataCenters, DROP CONSTRAINT  FK_DataCenters2;'
		);
	},
};
