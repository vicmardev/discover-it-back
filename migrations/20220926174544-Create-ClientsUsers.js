'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('ClientsUsers', {
				IdUser: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				IdClient: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Clients',

						key: 'IdClient',
					},
				},
				NameUser: {
					type: Sequelize.INTEGER,
				},
				Roll: {
					type: Sequelize.INTEGER,
				},
				Area: {
					type: Sequelize.INTEGER,
				},
				Status: {
					type: Sequelize.INTEGER,
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
			await queryInterface.dropTable('ClientsUsers');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
