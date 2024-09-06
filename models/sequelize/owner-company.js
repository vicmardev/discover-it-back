const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class OwnerCompany extends Model {
		static associate(models) {}
	}

	OwnerCompany.init(
		{
			IdOwnerCompany: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			Name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'OwnerCompany',
			tableName: 'OwnerCompany',
			timestamps: true,
		}
	);
};
