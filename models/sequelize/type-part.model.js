const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class TypePart extends Model {
		static associate(models) {}
	}

	TypePart.init(
		{
			IdTypePart: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Name: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Status: {
				type: DataTypes.TINYINT,
				unique: false,
				allowNull: true,
			},
			Description: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'TypePart',
			tableName: 'TypeParts',
			timestamps: true,
		}
	);
};
