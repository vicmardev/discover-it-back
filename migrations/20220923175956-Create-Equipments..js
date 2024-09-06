'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Equipments', {
				IdEquipment: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				Serial: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				SerialProvider: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				IdBrand: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Brands',

						key: 'IdBrand',
					},
				},
				IdTypePart: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: false,
					references: {
						model: 'TypeParts',

						key: 'IdTypePart',
					},
				},
				Model: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				IdProvider: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Providers',

						key: 'IdProvider',
					},
				},
				ComentsDelete: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				UserDelete: {
					type: Sequelize.STRING,
					allowNull: true,
				},
				DateDelete: {
					type: Sequelize.DATE,
					allowNull: true,
				},
				OriginalPart: {
					type: Sequelize.BOOLEAN,
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
			await queryInterface.dropTable('Equipments');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
