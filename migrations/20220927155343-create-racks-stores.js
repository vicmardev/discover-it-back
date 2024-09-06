'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('RacksStores', {
				IdRack: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				IdStore: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Stores',
						key: 'IdStore',
					},
				},

				NameRack: {
					type: Sequelize.STRING,
				},

				Column: {
					type: Sequelize.STRING,
				},

				Row: {
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
			await queryInterface.dropTable('RacksStores');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
