const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class OrderLog extends Model {
		static associate(models) {}
	}
	OrderLog.init(
		{
			IdLog: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			NumOrder: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Action: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Date: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			IdStatus: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			User: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			UserClient: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Comments: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			IdOwnerCompany: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			TotalEquipments: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Services: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			IdTypePart: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			IdBrand: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'OrderLog',
			tableName: 'OrderPurchase_Log',
			timestamps: false,
		}
	);
};
