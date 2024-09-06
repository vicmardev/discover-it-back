const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Quote extends Model {
		static associate(models) {
			models.Quote.belongsTo(models.Client, {foreignKey: 'IdCustomer', as: 'Customer'});
			models.Quote.belongsTo(models.StatusQuote, {foreignKey: 'IdQuote'});
			// models.Quote.belongsTo(models.CurrencyList, {foreignKey: 'IdCurrency'});
		}
	}

	Quote.init(
		{
			Id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			//IdCostumer from client
			//IdQuote from status quote

			Lead: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Currency: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Subtotal: {
				type: DataTypes.DECIMAL(20, 6),
				unique: false,
				allowNull: true,
			},
			IVA: {
				type: DataTypes.DECIMAL(20, 6),
				unique: false,
				allowNull: true,
			},
			Total: {
				//virtual?
				type: DataTypes.DECIMAL(20, 6),
				unique: false,
				allowNull: true,
			},
			Status: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Remark: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			UrlFile: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Folio: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Quote',
			tableName: 'Quotes',
			timestamps: true,
		}
	);
};
