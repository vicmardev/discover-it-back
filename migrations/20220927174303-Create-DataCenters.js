'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('DataCenters', {
				IdDataCenter: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				IdContract: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Contracts',

						key: 'IdContract',
					},
					onDelete: 'CASCADE',
				},
				City: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: false,
				},

				Country: {
					type: Sequelize.INTEGER,
					unique: false,
					allowNull: false,
				},
				Delegation: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				Neighborhood: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				PostalCode: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},

				Street: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},
				InternalNumber: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				ExternalNumber: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: true,
				},
				DataCenter: {
					type: Sequelize.STRING,
					unique: false,
					allowNull: false,
				},

				Latitud: {
					type: Sequelize.FLOAT,
					unique: false,
					allowNull: true,
				},
				Longitud: {
					type: Sequelize.FLOAT,
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
			await queryInterface.dropTable('DataCenters');
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
