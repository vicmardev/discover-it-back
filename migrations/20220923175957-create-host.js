'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Hosts', {
				IdHost: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				Hostname: {
					type: Sequelize.STRING,
					unique: true,
					allowNull: false,
				},
				StatusCode: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				SerialNumber: {
					type: Sequelize.STRING,
					unique: true,
					allowNull: true,
				},
				HostsImageUrl: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				TypeHosts: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				IdEquipment: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: false,
					references: {
						model: 'Equipments',

						key: 'IdEquipment',
					},
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
			await queryInterface.dropTable('Hosts');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
