'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable('Users', {
				IdUser: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				IdResetToken: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'ResetTokens',
						key: 'IdResetToken',
					},
				},
				IdClient: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'Clients',
						key: 'IdClient',
					},
				},
				Rol: {
					type: Sequelize.STRING,
				},
				Area: {
					type: Sequelize.INTEGER,
				},
				Status: {
					type: Sequelize.INTEGER,
				},
				LoginAttemps: {
					type: Sequelize.STRING,
				},
				StatusLogin: {
					type: Sequelize.TINYINT,
				},
				FirstName: {
					type: Sequelize.STRING,
				},
				LastName: {
					type: Sequelize.STRING,
				},
				Email: {
					type: Sequelize.STRING,
				},
				AcceptedTerms: {
					type: Sequelize.TINYINT,
				},
				VerificationToken: {
					type: Sequelize.STRING,
				},
				PasswordHash: {
					type: Sequelize.STRING,
				},
				Verified: {
					type: Sequelize.DATE,
				},
				BanTime: {
					type: Sequelize.DATE,
				},
				PasswordReset: {
					type: Sequelize.DATE,
				},
				AvatarImagePath: {
					type: Sequelize.STRING,
				},
				VerificationToken: {
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
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable('Users');
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
