'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('ChasisEquipments', {
				IdChasisEquipment: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				Hostname: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Ip: {
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
				SerialNumber: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				FirmwareVersion: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Type: {
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
			await queryInterface.dropTable('ChasisEquipments');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
