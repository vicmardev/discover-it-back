'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuotesProviders', {
			IdProvider: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			Name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			NameContact: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			PhoneContact: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			EmailContact: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			IdAdress: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			Comments: {
				type: Sequelize.STRING,
				allowNull: true,
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
		await queryInterface.dropTable('QuotesProviders');
	},
};
