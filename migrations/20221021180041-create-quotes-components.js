'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuotesComponents', {
			IdComponent: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			IdPartsCatalog: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			NameComponent: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			IdProvider: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			UnitePrice: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			IdCurrency: {
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
		await queryInterface.dropTable('QuotesComponents');
	},
};
