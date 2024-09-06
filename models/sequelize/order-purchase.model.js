const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class Order extends Model {
		static associate(models) {}
	}
	Order.init(
		{
			IdOrder: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			NumOrder: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: false,
			},
			DateReceptionEmail: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			User: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			UserClient: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			UrlOrderFile: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Comments: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			EmailUserFinal: {
				type: DataTypes.STRING,
				unique: false.valueOf,
				allowNull: false,
			},
			IdOwnerCompany: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: false,
			},
			TotalEquipments: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: false,
			},
			Services: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: false,
			},
			Subtotal: {
				type: DataTypes.INTEGER,
				unique: false,
				allowNull: false,
			},
			StatusOrder: {
				type: DataTypes.TINYINT,
				unique: false,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Order',
			tableName: 'OrderPurchase',
			timestamps: true,
		}
	);
};

//-Agregar servicio: activación de servicio de soporte &compra equipo: recepción de equipamiento
