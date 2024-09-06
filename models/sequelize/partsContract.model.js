'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class partsContract extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	parts -
		contract.init(
			{
				IdPart: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				Contract: {
					type: DataTypes.STRING,
					unique: false,
					allowNull: false,
				},
			},
			{
				sequelize,
				modelName: 'partsContract',
				tableName: 'PartsContracts',
				timestamps: true,
			}
		);
	return parts - contract;
};
