'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('ComponentsChasis', {
				IdComponent: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				IdChasis: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: true,

					references: {
						model: 'ChasisEquipments',

						key: 'IdChasisEquipment',
					},
					onDelete: 'CASCADE',
				},
				TypeComponent: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				SerialNumber: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				PartNumber: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				Description: {
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
			await queryInterface.dropTable('ComponentsChasis');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
