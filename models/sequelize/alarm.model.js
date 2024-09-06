const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Alarm extends Model {
		static associate(models) {
			// models.Alarm.hasOne(models.Service)
		}
	}

	Alarm.init(
		{
			IdAlarm: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			//ServiceId from association?
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
			Status: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			PluginOutput: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Duration: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Attemps: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Notifications: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Ack: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Alarm',
			tableName: 'Alarms',
			timestamps: false,
		}
	);
};
