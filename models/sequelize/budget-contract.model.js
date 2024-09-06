const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class BudgetContract extends Model {
		static associate(models) {
			models.BudgetContract.belongsTo(models.Contract, {foreignKey: 'IdContract'});
			models.BudgetContract.belongsTo(models.CurrencyList, {foreignKey: 'IdCurrency'});
		}
	}

	BudgetContract.init(
		{
			IdBudgetContracts: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			IdUser: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Budget: {
				type: DataTypes.FLOAT,
				unique: false,
				allowNull: true,
			},
			Description: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			BudgetHR: {
				type: DataTypes.FLOAT,
				unique: false,
				allowNull: true,
			},
			BudgetProviders: {
				type: DataTypes.FLOAT,
				unique: false,
				allowNull: true,
			},
			IdCurrency: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'BudgetContract',
			tableName: 'BudgetContracts',
			timestamps: true,
		}
	);
};
