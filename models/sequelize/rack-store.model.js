const {DataTypes, Model} = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
	class RackStore extends Model {
		static associate(models) {}
	}

	RackStore.init(
		{
			IdRack: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			NameRack: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Column: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Row: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
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
		},
		{
			//options
			sequelize,
			modelName: 'RackStore',
			tableName: 'RacksStores',
			timestamps: false,
		}
	);
};
