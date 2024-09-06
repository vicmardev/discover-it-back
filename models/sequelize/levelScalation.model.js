const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class LevelScalation extends Model {
		static associate(models) {}
	}

	LevelScalation.init(
		{
			IdLevelScalation: {
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
			Status: {
				type: DataTypes.TINYINT,
				unique: false,
				allowNull: true,
			},
			Description: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'LevelScalation',
			tableName: 'LevelScalations',
			timestamps: true,
		}
	);
};
