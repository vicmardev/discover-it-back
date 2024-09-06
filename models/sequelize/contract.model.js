const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class Contract extends Model {
		static associate(models) {}
	}

	Contract.init(
		{
			IdContract: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			IdClient: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			IdOrder: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			IdOwnerCompany: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
Contract: {
                type: DataTypes.STRING,
                unique: false,
                allowNull: false,
            },
			StartContract: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: false,
			},
			EndContract: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: false,
			},
			Status: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Alias: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: true,
			},

			Year: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Contract',
			tableName: 'Contracts',
			timestamps: true,
		}
	);
};
