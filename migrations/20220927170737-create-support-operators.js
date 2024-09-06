'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('SupportOperators', {
				IdSupportOperators: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},

				IdLevelScalation: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'LevelScalations',
						key: 'IdLevelScalation',
					},
				},

				Name: {
					type: Sequelize.STRING,
				},

				Email: {
					type: Sequelize.STRING,
				},

				Telephone: {
					type: Sequelize.STRING,
				},

				Status: {
					type: Sequelize.TINYINT,
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
			await queryInterface.dropTable('SupportOperators');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
