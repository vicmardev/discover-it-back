const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class GeneralStatus extends Model {
		static associate(models) {}
	}
	GeneralStatus.init(
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
				allowNull: false,
			},
			Dashboard: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Description: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'GeneralStatus',
			tableName: 'StatusGenerales',
			timestamps: false,
		}
	);
};
