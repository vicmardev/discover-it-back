const {DataTypes, Model} = require('sequelize');
const service = require('./service.model');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Host extends Model {
		static associate(models) {}
	}

	Host.init(
		{
			IdHost: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Hostname: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			StatusCode: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			SerialNumber: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			HostsImageUrl: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
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
			modelName: 'Host',
			tableName: 'Hosts',
			timestamps: false,
		}
	);
};
