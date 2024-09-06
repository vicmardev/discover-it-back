const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class ContractEngineer extends Model {
		static associate(models) {
			models.ContractEngineer.belongsTo(models.Contract, {foreignKey: 'IdContract'});
			models.ContractEngineer.belongsTo(models.SupportOperator, {
				foreignKey: 'IdEngineer',
				as: 'ce',
			});
		}
	}

	ContractEngineer.init(
		{
			Id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'ContractEngineer',
			tableName: 'ContractEngineers',
			timestamps: true,
		}
	);
};
