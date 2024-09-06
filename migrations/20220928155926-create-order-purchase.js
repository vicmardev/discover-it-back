'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('OrderPurchase', {
				IdOrder: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				IdClient: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdStatus: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdOwnerCompany: {
					type: Sequelize.INTEGER,
					allowNull: false,
				},
				IdTypePart: {
					type: Sequelize.INTEGER,
				},
				IdBrand: {
					type: Sequelize.INTEGER,
				},
				NumOrder: {
					type: Sequelize.BIGINT,
				},
				DateReceptionEmail: {
					type: Sequelize.DATE,
				},
				User: {
					type: Sequelize.STRING,
				},
				UserClient: {
					type: Sequelize.STRING,
				},
				UrlOrderFile: {
					type: Sequelize.STRING,
				},
				Comments: {
					type: Sequelize.STRING,
				},
				EmailUserFinal: {
					type: Sequelize.STRING,
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
				StatusOrder: {
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
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('OrderPurchase');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
