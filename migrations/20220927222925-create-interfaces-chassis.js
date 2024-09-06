'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('InterfaceChassis', {
				IdComponent: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				IdChasis: {
					type: Sequelize.INTEGER,
					references: {
						model: 'ChasisEquipments',

						key: 'IdChasisEquipment',
					},
				},
				InterfaceName: {
					type: Sequelize.STRING,
				},
				PhysicalStatus: {
					type: Sequelize.STRING,
				},
				LogicalStatus: {
					type: Sequelize.STRING,
				},
				IpAddress: {
					type: Sequelize.STRING,
				},
				Vlan: {
					type: Sequelize.STRING,
				},
				Duplex: {
					type: Sequelize.STRING,
				},
				Speed: {
					type: Sequelize.STRING,
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
			await queryInterface.dropTable('InterfaceChassis');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
