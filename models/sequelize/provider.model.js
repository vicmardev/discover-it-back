const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Provider extends Model {
		static associate(models) {}
	}

	Provider.init(
		{
			IdProvider: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Name: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			/*
			Status: {
				type: DataTypes.INTEGER,
			},
			*/
			NameContact: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			PhoneContact: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			EmailContact: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			City: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Country: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Delegation: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			PostalCode: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			InternalNumber: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			ExternalNumber: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: true,
			},
			Comments: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Provider',
			tableName: 'Providers',
			timestamps: false,
		}
	);
};
