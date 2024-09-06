'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {}
	}
	User.init(
		{
			IdUser: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Rol: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Area: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			Status: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			LoginAttemps: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			StatusLogin: {
				type: DataTypes.TINYINT,
				unique: false,
				allowNull: true,
			},
			FirstName: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			LastName: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Email: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			AcceptedTerms: {
				type: DataTypes.TINYINT,
				unique: false,
				allowNull: true,
			},
			VerificationToken: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			PasswordHash: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Verified: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: true,
			},
			BanTime: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: true,
			},
			PasswordReset: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: true,
			},
			AvatarImagePath: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			VerificationToken: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'Users',
			timestamps: true,
		}
	);
};
