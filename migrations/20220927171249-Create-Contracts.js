'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Contracts', {
				IdContract: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				IdOrder: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdOwnerCompany: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdClient: {
					type: Sequelize.INTEGER,
				},
				Contract: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				StartContract: {
					type: Sequelize.DATE,
					unique: false,
					allowNull: false,
				},
				EndContract: {
					type: Sequelize.DATE,
					unique: false,
					allowNull: false,
				},
				Status: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				Alias: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Year: {
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
			await queryInterface.dropTable('Contracts');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
