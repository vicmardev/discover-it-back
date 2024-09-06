'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = sequelize => {
	class ContractTime extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {}
	}
	ContractTime.init(
		{
			IdContractTime: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Duration: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'ContractTime',
			tableName: 'ContractTime',
		}
	);
	return ContractTime;
};
