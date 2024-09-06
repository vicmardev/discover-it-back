'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('OrderPurchase_Log', {
				IdLog: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				IdOrder: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdClient: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				NumOrder: {
					type: Sequelize.BIGINT,
				},
				Action: {
					type: Sequelize.STRING,
				},
				Date: {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				IdStatus: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				User: {
					type: Sequelize.STRING,
				},
				UserClient: {
					type: Sequelize.STRING,
				},
				Comments: {
					type: Sequelize.STRING,
				},

				IdOwnerCompany: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				TotalEquipments: {
					type: Sequelize.INTEGER,
				},
				Services: {
					type: Sequelize.STRING,
				},
				Subtotal: {
					type: Sequelize.DECIMAL,
				},
				IdTypePart: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdBrand: {
					type: Sequelize.INTEGER,
					allowNull: false,
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
			await queryInterface.dropTable('OrderPurchase_Log');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
