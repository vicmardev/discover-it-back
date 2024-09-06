'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('TypeParts', {
				IdTypePart: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				Name: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Status: {
					type: Sequelize.TINYINT,
					unique: false,
					allowNull: true,
				},
				Description: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},

				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					type: Sequelize.DATE,
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
			await queryInterface.dropTable('TypeParts');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
