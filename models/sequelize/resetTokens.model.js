'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ResetTokens extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	ResetTokens.init(
		{
			IdResetToken: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Token: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Expires: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'ResetTokens',
			tableName: 'ResetTokens',
			timestamps: true,
		}
	);
};
