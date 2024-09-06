const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class ChasisEquipment extends Model {
		static associate(models) {}
	}

	ChasisEquipment.init(
		{
			IdChasisEquipment: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Hostname: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Ip: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Brand: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Model: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			SerialNumber: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			FirmwareVersion: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Type: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'ChasisEquipment',
			tableName: 'ChasisEquipments',
			timestamps: true,
		}
	);
};
