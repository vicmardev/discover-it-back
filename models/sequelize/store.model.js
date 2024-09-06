const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class Store extends Model {
		static associate(models) {}
	}

	Store.init(
		{
			IdStore: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Name: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Adress: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Store',
			tableName: 'Stores',
			timestamps: false,
		}
	);
};
