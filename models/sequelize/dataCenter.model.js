const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class DataCenter extends Model {
		static associate(models) {}
	}

	DataCenter.init(
		{
			IdDataCenter: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			IdContract: {
				type: DataTypes.NUMBER,
				allowNull: false,
			},
			IdCity: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},

			IdCountry: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Delegation: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},

			PostalCode: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},

			Street: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: false,
			},
			InternalNumber: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},

			DataCenter: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},

			ExternalNumber: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},

			Neighborhood: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},

			Latitud: {
				type: DataTypes.FLOAT,
				unique: false,
				allowNull: true,
			},
			Longitud: {
				type: DataTypes.FLOAT,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'DataCenter',
			tableName: 'DataCenters',
			timestamps: true,
		}
	);
};
