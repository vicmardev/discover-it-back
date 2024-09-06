'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Parts', {
				IdPart: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				IdProvider: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
					references: {
						model: 'Providers',

						key: 'IdProvider',
					},
				},
				IdStore: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,
					references: {
						model: 'Stores',

						key: 'IdStore',
					},
				},
				Contract: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				TypePart: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Brand: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Model: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				PartNumber: {
					type: Sequelize.STRING,
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
			await queryInterface.dropTable('Parts');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
