'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('ContractEngineers_Log', {
				IdLog: {
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
				Action: {
					type: Sequelize.STRING,
				},
				IdUser: {
					type: Sequelize.STRING,
				},
				Date: {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
			await queryInterface.dropTable('ContractEngineers_Log');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
