'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuotesMargins', {
			IdMargin: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			PorcentageNumebr: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			Percentage: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('QuotesMargins');
	},
};
