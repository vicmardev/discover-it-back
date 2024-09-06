const {DataTypes, Model} = require('sequelize');
const service = require('./service.model');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class OperationPart extends Model {
		static associate(models) {}
	}

	OperationPart.init(
		{
			SerialNumber: {
				type: DataTypes.STRING,
				primaryKey: true,
				autoIncrement: false,
			},
			IdTicket: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			Available: {
				type: DataTypes.BOOLEAN,
				unique: false,
				allowNull: false,
			},
			DateEntry: {
				type: DataTypes.DATEONLY,
				unique: false,
				allowNull: true,
			},
			UserEntry: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			NumInvoiceEntry: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			DateExit: {
				type: DataTypes.DATEONLY,
				unique: false,
				allowNull: true,
			},
			UserExit: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			NumInvoiceExit: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'OperationPart',
			tableName: 'OperationParts',
			timestamps: false,
		}
	);
};
