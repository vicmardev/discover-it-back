'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuotesCurrencyLists', {
			IdCurrency: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			CurrencyCode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			CurrencyName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Status: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable('QuotesCurrencyLists');
	},
};
