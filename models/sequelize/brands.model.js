const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class Brand extends Model {
		static associate(models) {}
	}

	Brand.init(
		{
			IdBrand: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			NameBrand: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			Status: {
				type: DataTypes.INTEGER,
			},
			Description: {
				type: DataTypes.STRING,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Brand',
			tableName: 'Brands',
			timestamps: true,
		}
	);
};
