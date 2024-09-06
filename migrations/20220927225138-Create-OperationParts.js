'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('OperationParts', {
				SerialNumber: {
					type: Sequelize.STRING,
					primaryKey: true,
					autoIncrement: false,
				},
				IdPart: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
				},
				IdRack: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
				},
				IdTicket: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
				},
				Available: {
					type: Sequelize.BOOLEAN,
					unique: false,
					allowNull: false,
				},
				DateEntry: {
					type: Sequelize.DATEONLY,
					unique: false,
					allowNull: true,
				},
				UserEntry: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				NumInvoiceEntry: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
				},
				DateExit: {
					type: Sequelize.DATEONLY,
					unique: false,
					allowNull: true,
				},
				UserExit: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				NumInvoiceExit: {
					type: Sequelize.INTEGER,
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
			await queryInterface.dropTable('OperationParts');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
