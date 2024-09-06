const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
	class Faq extends Model {
		static associate(models) {}
	}

	Faq.init(
		{
			IdFaqs: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Area: {
				type: DataTypes.STRING,
			},
			Question: {
				type: DataTypes.STRING,
			},
			Response: {
				type: DataTypes.STRING,
			},
			Status: {
				type: DataTypes.STRING,
				defaultValue: 'true',
			},
			Questiontype: {
				type: DataTypes.STRING,
			},
		},
		{
			//options
			sequelize,
			modelName: 'Faq',
			tableName: 'Faqs',
			timestamps: true,
		}
	);
};
