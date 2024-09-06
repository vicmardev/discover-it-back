const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class Client extends Model {
		static associate(models) {}
	}

	Client.init(
		{
			IdClient: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Status: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			Family: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			RegisteredName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			AdressFiscal: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			RFC: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: false,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Client',
			tableName: 'Clients',
			timestamps: true,
		}
	);
};
