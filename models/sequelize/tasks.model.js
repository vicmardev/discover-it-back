'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Tasks extends Model {
		static associate(models) {}
	}
	Tasks.init(
		{
			IdTask: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			Title: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			CreatetionDate: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: true,
			},
			StartDate: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: true,
			},
			EndDate: {
				type: DataTypes.DATE,
				unique: false,
				allowNull: true,
			},
			CreatedBy: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			Comments: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
			UpdatedBy: {
				type: DataTypes.STRING,
				unique: false,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Tasks',
			tableName: 'Tasks',
			timestamps: true,
		}
	);
};
