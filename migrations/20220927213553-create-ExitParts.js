'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('ExitParts', {
				SerialNumber: {
					allowNull: false,
					autoIncrement: false,
					primaryKey: true,
					type: Sequelize.STRING,
				},
				IdPart: {
					type: Sequelize.INTEGER,
				},
				IdTicket: {
					type: Sequelize.STRING,
				},
				Available: {
					type: Sequelize.STRING,
				},
				DateExit: {
					type: Sequelize.DATE,
				},
				User: {
					type: Sequelize.STRING,
				},
				NumInvoiceEntry: {
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
			await queryInterface.dropTable('ExitParts');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
