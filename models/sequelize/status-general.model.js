const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class StatusGeneral extends Model {
		static associate(models) {}
	}
	StatusGeneral.init(
		{
			IdStatus: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				unique: true,
				autoIncrement: true,
				allowNull: false,
			},
			Status: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Dashboard: {
				type: DataTypes.STRING,
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
			modelName: 'StatusGeneral',
			tableName: 'StatusGenerales',
			timestamps: false,
		}
	);
};
