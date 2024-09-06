const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class CurrencyList extends Model {
		static associate(models) {}
	}

	CurrencyList.init(
		{
			IdCurrency: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			CurrencyCode: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			CurrencyName: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Status: {
				type: DataTypes.BOOLEAN,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'CurrencyList',
			tableName: 'CurrencyList',
			timestamps: true,
		}
	);
};
