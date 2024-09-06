const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class Equipment extends Model {
		static associate(models) {}
	}

	Equipment.init(
		{
			IdEquipment: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			IdProvider: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			IdBrand: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			IdTypePart: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: false,
			},
			Serial: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},

			SerialProvider: {
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
		},
		{
			//options
			sequelize,
			modelName: 'Equipment',
			tableName: 'Equipments',
			timestamps: true,
		}
	);
};
