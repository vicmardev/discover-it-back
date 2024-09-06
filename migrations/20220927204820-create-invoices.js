'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Invoices', {
				IdInvoice: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},

				IdProvider: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Providers',
						key: 'IdProvider',
					},
				},

				NumInvoice: {
					type: Sequelize.INTEGER,
				},
				PathFilePediment: {
					type: Sequelize.STRING,
				},
				PathFileInvoice: {
					type: Sequelize.STRING,
				},
				Client: {
					type: Sequelize.STRING,
				},
				NameReceptor: {
					type: Sequelize.STRING,
				},
				CommentsReceptor: {
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
			await queryInterface.dropTable('Invoices');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
