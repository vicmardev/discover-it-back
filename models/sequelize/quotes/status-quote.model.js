const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class StatusQuote extends Model {
		static associate(models) {}
	}

	StatusQuote.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			Status: {
				type: DataTypes.STRING,
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
			modelName: 'StatusQuote',
			tableName: 'StatusQuotes',
			timestamps: true,
		}
	);
};
