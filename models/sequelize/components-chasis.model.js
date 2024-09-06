const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class ComponentChasis extends Model {
		static associate(models) {}
	}

	ComponentChasis.init(
		{
			IdComponent: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			IdChasis: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			TypeComponent: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			SerialNumber: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			PartNumber: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Description: {
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
		},
		{
			//options
			sequelize,
			modelName: 'ComponentChasis',
			tableName: 'ComponentsChasis',
			timestamps: true,
		}
	);
};
