const {DataTypes, Model} = require('sequelize');
const service = require('./service.model');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Part extends Model {
		static associate(models) {}
	}

	Part.init(
		{
			IdPart: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Contract: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			TypePart: {
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
			PartNumber: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Part',
			tableName: 'Parts',
			timestamps: false,
		}
	);
};
