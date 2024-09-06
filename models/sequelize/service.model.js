const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Service extends Model {
		static associate(models) {
			// models.Service.hasMany(models.Service)
		}
	}

	Service.init(
		{
			IdService: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			//HostId from association
			Name: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			CurrentAlarmId: {
				type: DataTypes.INTEGER,
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
			modelName: 'Service',
			tableName: 'Services',
			timestamps: false,
		}
	);
};
