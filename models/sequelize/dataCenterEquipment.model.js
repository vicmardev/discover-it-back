const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class DataCenterEquipment extends Model {
		static associate(models) {}
	}

	DataCenterEquipment.init(
		{
			IdDataCenterEquipment: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			IdSLA: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			IdContractTime: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			IdDataCenter:{
				type:DataTypes.INTEGER,
				allowNull:true
			},
			IP: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			ServiceTag: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'DataCenterEquipment',
			tableName: 'DataCentersEquipments',
			timestamps: true,
		}
	);
};
