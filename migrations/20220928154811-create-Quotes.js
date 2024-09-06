'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Quotes', {
				Id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				IdCustomer: {
					type: Sequelize.INTEGER,
				},
				IdQuote: {
					type: Sequelize.INTEGER,
				},
				Folio: {
					type: Sequelize.STRING,
				},
				Lead: {
					type: Sequelize.STRING,
				},
				Currency: {
					type: Sequelize.STRING,
				},
				SubTotal: {
					type: Sequelize.FLOAT,
				},
				IVA: {
					type: Sequelize.FLOAT,
				},
				Total: {
					type: Sequelize.FLOAT,
				},
				Status: {
					type: Sequelize.STRING,
				},
				Remark: {
					type: Sequelize.STRING,
				},
				UrlFile: {
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
			await queryInterface.dropTable('Quotes');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
