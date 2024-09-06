'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('DataCentersEquipments', {
				IdDataCenterEquipment: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				IdDataCenter: {
					type: Sequelize.INTEGER,
					allowNull: true,
					references: {
						model: 'DataCenters',

						key: 'IdDataCenter',
					},
					onDelete: 'CASCADE',
				},
				IdEquipment: {
					type: Sequelize.INTEGER,
					allowNull: true,
					references: {
						model: 'Equipments',

						key: 'IdEquipment',
					},
					onDelete: 'CASCADE',
				},
				IdSLA: {
					type: Sequelize.INTEGER,
					allowNull: true,
					references: {
						model: 'SLAs',

						key: 'IdSLA',
					},
				},
				ServiceTag: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				Ip: {
					type: Sequelize.STRING,
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
			await queryInterface.dropTable('DataCentersEquipments');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
