'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('BudgetContracts', {
				IdBudgetContracts: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				IdCurrency: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
				},
				IdContract: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
				},
				IdUser: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Budget: {
					type: Sequelize.FLOAT,
					unique: false,
					allowNull: true,
				},
				BudgetHR: {
					type: Sequelize.FLOAT,
					unique: false,
					allowNull: true,
				},
				BudgetProviders: {
					type: Sequelize.FLOAT,
					unique: false,
					allowNull: true,
				},
				Description: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				createdAt: {
					type: Sequelize.DATE,
				},
				updatedAt: {
					type: Sequelize.DATE,
				},
			});
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('BudgetContracts');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
