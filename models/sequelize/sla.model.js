const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class SLA extends Model {
		static associate(models) {}
	}

	SLA.init(
		{
			IdSLA: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING,
			},
			Status: {
				type: DataTypes.INTEGER,
			},
		},
		{
			//options
			sequelize,
			modelName: 'SLA',
			tableName: 'SLAs',
			timestamps: true,
		}
	);
};
