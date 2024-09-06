'use strict';
const {DataTypes, Model} = require('sequelize');
module.exports = sequelize=> {
	class ContractTIme extends Model {
		static associate(models) {
		}
	}
	ContractTIme.init(
		{
			idContractTime: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},

			Duration: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
		},

		{
			sequelize,
			modelName: 'ContractTime',
			tableName: 'ContractTime',
			timestamps: true,
		}
	);
	return ContractTIme;
};
