'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('RefreshTokens', {
			IdRefreshToken: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			Token: {
				type: Sequelize.STRING,
			},
			Expires: {
				type: Sequelize.DATE,
			},
			CreatedByIp: {
				type: Sequelize.STRING,
			},
			ReplacedByToken: {
				type: Sequelize.STRING,
			},
			Revoked: {
				type: Sequelize.DATE,
			},
			RevokedByIp: {
				type: Sequelize.STRING,
			},
			IdUser: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',

					key: 'IdUser',
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
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('RefreshTokens');
	},
};
