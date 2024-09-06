'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('HistoricContracts', {
				IdNewContract: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},

				IdContract: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Contracts',

						key: 'IdContract',
					},
				},
				NewContract: {
					type: Sequelize.STRING,
				},
				DateRegister: {
					type: Sequelize.STRING,
				},
				Status: {
					type: Sequelize.STRING,
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
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('HistoricContracts');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
