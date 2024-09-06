const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Task extends Model {
		static associate(models) {
			models.SupportOperator.hasMany(models.Task, {foreignKey: 'AssignedTo'});
			models.Task.belongsTo(models.SupportOperator, {foreignKey: 'AssignedTo'});
		}
	}

	Task.init(
		{
			IdTask: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},

			Title: {
				type: DataTypes.STRING(120),
				unique: false,
				allowNull: false,
			},
			CreationDate: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			StartDate: {
				type: DataTypes.DATE,
				defaultValue: '0000-00-00 00:00:00',
				allowNull: false,
			},
			EndDate: {
				type: DataTypes.DATE,
				defaultValue: '0000-00-00 00:00:00',
				allowNull: false,
			},
			CreatedBy: {
				type: DataTypes.STRING(120),
				unique: false,
				allowNull: false,
			},
			Comments: {
				type: DataTypes.STRING(120),
				unique: false,
				allowNull: true,
			},
			UpdatedBy: {
				type: DataTypes.STRING(120),
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Task',
			tableName: 'Tasks',
			timestamps: false,
		}
	);
};
