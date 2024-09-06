'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Stores', {
				IdStore: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				Name: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Adress: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Status: {
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
			await queryInterface.dropTable('Stores');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
