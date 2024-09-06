'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Brands', {
				IdBrand: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				NameBrand: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				Status: {
					type: Sequelize.INTEGER,
				},
				Description: {
					type: Sequelize.STRING,
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
			await queryInterface.dropTable('Brands');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
