'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Tasks', {
				IdTask: {
					type: Sequelize.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},

				AssignedTo: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'SupportOperators',
						key: 'IdSupportOperators',
					},
				},

				Title: {
					type: Sequelize.STRING,
				},
				StartDate: {
					type: Sequelize.DATE,
				},
				EndDate: {
					type: Sequelize.DATE,
				},
				CreatedBy: {
					type: Sequelize.STRING,
				},
				Comments: {
					type: Sequelize.STRING,
				},
				UpdatedBy: {
					type: Sequelize.STRING,
				},
				CreationDate: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				UpdatedAt: {
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
			await queryInterface.dropTable('Tasks');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
