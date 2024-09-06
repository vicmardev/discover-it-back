'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('OperatorsContracts', {
				IdOperatorsContracts: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				IdContract: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Contracts',

						key: 'IdContract',
					},
				},
				IdClient: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Clients',

						key: 'IdClient',
					},
				},
				IdSupportOPerators: {
					type: Sequelize.INTEGER,
					references: {
						model: 'SupportOperators',

						key: 'IdSupportOPerators',
					},
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
			await queryInterface.dropTable('OperatorsContracts');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
