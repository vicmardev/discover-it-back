const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class OperatorContract extends Model {
		static associate(models) {
			models.OperatorContract.belongsTo(models.Client, {foreignKey: 'IdClient'});
			models.OperatorContract.belongsTo(models.Contract, {foreignKey: 'IdContract'});
			models.OperatorContract.belongsTo(models.SupportOperator, {
				foreignKey: 'IdSupportOPerators',
			});
		}
	}

	OperatorContract.init(
		{
			IdOperatorsContracts: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			IdContract: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdClient: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			IdSupportOPerators: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'OperatorContract',
			tableName: 'OperatorsContracts',
			timestamps: true,
		}
	);
};
