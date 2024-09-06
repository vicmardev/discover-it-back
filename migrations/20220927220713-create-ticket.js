'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Tickets', {
				IdTicket: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				NameTicket: {
					type: Sequelize.STRING,
				},
				Severity: {
					type: Sequelize.STRING,
				},
				IdStatus: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdContract: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdClient: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdDataCenter: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdUser: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},

				IdEquipment: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdSupportOPerators: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},

				IdLevelScalation: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},

				DescriptionTicket: {
					type: Sequelize.STRING,
				},
				OperativeSystem: {
					type: Sequelize.STRING,
				},
				PathEvidenceClient: {
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
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('Tickets');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
