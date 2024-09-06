const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class SupportOperator extends Model {
		static associate(models) {}
	}

	SupportOperator.init(
		{
			IdSupportOPerators: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			IdLevelScalation: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			Name: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Email: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Telephone: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Status: {
				type: DataTypes.TINYINT,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'SupportOperator',
			tableName: 'SupportOperators',
			timestamps: true,
		}
	);
};
