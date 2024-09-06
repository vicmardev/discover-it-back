const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class Inventory extends Model {
		static associate(models) {}
	}

	Inventory.init(
		{
			IdInventory: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Alias: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: true,
			},

			Serial: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			ServiceTag: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			SerialProvider: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			HardwareProvider: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Brand: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Equipment: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Model: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},

			OriginalPart: {
				type: DataTypes.BOOLEAN,
				unique: false,
				allowNull: true,
			},

			StartContract: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			EndContract: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Contract: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Status: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			SLA: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			IP: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Inventory',
			tableName: 'Inventory',
			timestamps: false,
		}
	);
};
