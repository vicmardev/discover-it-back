'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Faqs', {
				IdFaqs: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				Area: {
					type: Sequelize.STRING,
				},
				Question: {
					type: Sequelize.STRING,
				},
				Response: {
					type: Sequelize.STRING,
				},
				Status: {
					type: Sequelize.STRING,
					defaultValue: 'true',
				},
				Questiontype: {
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
			await queryInterface.dropTable('Faqs');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
