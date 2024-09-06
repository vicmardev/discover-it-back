'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Providers', {
				IdProvider: {
					allowNull: false,
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				Name: {
					type: Sequelize.STRING,
				},
				Status: {
					type: Sequelize.STRING,
				},
				NameContact: {
					type: Sequelize.STRING,
				},
				PhoneContact: {
					type: Sequelize.STRING,
				},
				EmailContact: {
					type: Sequelize.STRING,
				},
				City: {
					type: Sequelize.STRING,
				},
				Country: {
					type: Sequelize.STRING,
				},
				Delegation: {
					type: Sequelize.STRING,
				},
				PostalCode: {
					type: Sequelize.INTEGER,
				},
				InternalNumber: {
					type: Sequelize.INTEGER,
				},
				ExternalNumber: {
					type: Sequelize.INTEGER,
				},
				Comments: {
					type: Sequelize.STRING,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				createdAt: {
					type: Sequelize.DATE,
				},
			});
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('Providers');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
