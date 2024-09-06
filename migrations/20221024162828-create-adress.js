'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('QuotesAdress', {
			IdAdress: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			City: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Country: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			PostalCode: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			Delegation: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Neighborhood: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			Street: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			BuildingNumber: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			InteriorNumber: {
				type: Sequelize.STRING,
			},
			updatedAt: {
				type: Sequelize.DATE,
			},
			createdAt: {
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('QuotesAdress');
	},
};
