'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('ContractEngineers', {
				Id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				IdContract: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdEngineer: {
					type: Sequelize.INTEGER,
				},
				IdUser: {
					type: Sequelize.INTEGER,
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
			await queryInterface.dropTable('ContractEngineers');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
