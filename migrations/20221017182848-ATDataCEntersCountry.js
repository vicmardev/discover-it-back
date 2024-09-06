'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCenters CHANGE Country IdCountry INT NOT NULL ;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCenters CHANGE IdCountry Country  INT NOT NULL;'
		);
	},
};
