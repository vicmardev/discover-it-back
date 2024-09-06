'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('IssuesTypesTickets', {
				IdIssuesTypesTickets: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				Name: {
					type: Sequelize.STRING,
				},
				Description: {
					type: Sequelize.STRING,
				},
				Status: {
					type: Sequelize.TINYINT,
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
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('IssuesTypesTickets');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
