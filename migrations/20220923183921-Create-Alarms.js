'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Alarms', {
				IdAlarm: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				IdService: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: false,
					references: {
						model: 'Services',

						key: 'IdService',
					},
				},
				Status: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				PluginOutput: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				Duration: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				Attemps: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Notifications: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Ack: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
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
			await queryInterface.dropTable('Alarms');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
