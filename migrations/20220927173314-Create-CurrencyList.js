'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('CurrencyList', {
				IdCurrency: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				CurrencyCode: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				CurrencyName: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Status: {
					type: Sequelize.BOOLEAN,
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
			await queryInterface.dropTable('CurrencyList');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
