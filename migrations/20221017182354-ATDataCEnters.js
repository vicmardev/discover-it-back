'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCenters CHANGE City IdCity INT NOT NULL ;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE DataCenters CHANGE IdCity City  INT NOT NULL;'
		);
	},
};
