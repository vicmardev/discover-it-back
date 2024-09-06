const {Sequelize} = require('sequelize');
const config = require('../config.json');

const sequelize = new Sequelize(config.connectionStringMariaDB, {
	logging: false,
});

const syncDB = async sequelize => {
	const models = sequelize.models;
	// await models.Faq.sync({force: true});
	// await models.ResetToken.sync({force: true});
	// await models.User.sync({force: true});
	// await models.RefreshToken.sync({force: true});
};

const modelDefiners = [
	require('models/sequelize/host.model'),
	require('models/sequelize/service.model'),
	require('models/sequelize/alarm.model'),
	require('models/sequelize/client.model'),
	require('models/sequelize/contract.model'),
	require('models/sequelize/owner-company.js'),

	require('models/sequelize/dataCenter.model'),
	require('models/sequelize/dataCenterEquipment.model'),
	require('models/sequelize/equipment.model'),
	require('models/sequelize/part.model'),
	require('models/sequelize/operationPart.model'),
	require('models/sequelize/store.model'),
	require('models/sequelize/provider.model'),
	require('models/sequelize/type-part.model'),
	require('models/sequelize/rack-store.model'),
	require('models/sequelize/brand.model'),
	require('models/sequelize/sla.model'),
	require('models/sequelize/chasis-equipment.model.js'),
	require('models/sequelize/components-chasis.model.js'),
	require('models/sequelize/generalStatus.model.js'),
	require('models/sequelize/order-purchase.model.js'),

	require('models/sequelize/quotes/quote.model.js'),
	require('models/sequelize/quotes/status-quote.model.js'),
	require('models/sequelize/faq.model'),
	require('models/sequelize/support-operator.model.js'),
	require('models/sequelize/budget-contract.model.js'),
	require('models/sequelize/currency-list.model'),
	require('models/sequelize/status-general.model'),
	require('models/sequelize/operator-contract.model.js'),
	require('models/sequelize/currency-list.model.js'),
	require('models/sequelize/contract-engineers.model.js'),
	require('models/sequelize/orderLogs.model.js'),
	require('models/sequelize/tasks/task.model'),
	require('models/country.model.js'),
	require('models/city.model.js'),
	//require('models/formatos.js'),
	require('models/sequelize/levelScalation.model.js'),
	require('models/sequelize/support-operator.model.js'),
	require('models/contracttime.model.js'),
	//require('models/sequelize/contracttime.js')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

const associateModels = sequelize => {
	const models = sequelize.models;

	models.LevelScalation.belongsTo(models.SupportOperator, {
		as: 'NameLevel',
		foreignKey: 'IdLevelScalation',
	});

	models.Host.hasMany(models.Service, {
		foreignKey: 'HostId',
	});
	models.Service.belongsTo(models.Host, {
		foreignKey: 'HostId',
	});

	models.Service.belongsTo(models.Alarm, {
		as: 'CurrentAlarm',
		foreignKey: 'CurrentAlarmId',
	});
	models.Alarm.hasOne(models.Service, {
		as: 'CurrentAlarm',
		foreignKey: 'CurrentAlarmId',
	});

	models.Alarm.belongsTo(models.Service, {
		as: 'AlarmList',
		foreignKey: 'ServiceId',
	});
	models.Service.hasMany(models.Alarm, {
		as: 'AlarmList',
		foreignKey: 'ServiceId',
	});
	models.Part.hasMany(models.OperationPart, {
		// as: 'OperationPartsList',
		foreignKey: 'IdPart',
	});

	models.Client.hasMany(models.Contract, {
		foreignKey: 'IdClient',
	});

	models.Contract.belongsTo(models.Client, {
		foreignKey: 'IdClient',
	});

	// Contract
	models.Contract.hasMany(models.DataCenter, {
		foreignKey: 'IdContract',
		as: 'DataCenters',
	});
	models.Contract.hasOne(models.Order, {
		as: 'Order',
		foreignKey: 'IdOrder',
	});

	models.Contract.hasOne(models.OwnerCompany, {
		as: 'OwnerCompany',
		foreignKey: 'IdOwnerCompany',
	});

	// DataCenter
	models.DataCenter.belongsTo(models.Contract, {
		foreignKey: 'IdContract',
		as: 'Contract',
	});

	models.DataCenter.belongsToMany(models.Equipment, {
		through: models.DataCenterEquipment,
		foreignKey: 'IdDataCenter',
		otherKey: 'IdEquipment',
		as: 'Equipments',
	});

	// Equipment
	models.Equipment.belongsToMany(models.DataCenter, {
		through: models.DataCenterEquipment,
		foreignKey: 'IdEquipment',
		otherKey: 'IdDataCenter',
	});


	models.DataCenterEquipment.belongsTo(models.DataCenter, {
		foreignKey: 'IdDataCenter',
		as: 'DataCenterEquipment'
	});

	models.DataCenter.hasMany(models.DataCenterEquipment, {
		foreignKey: 'IdDataCenter',
		as: 'DataCenterEquipment'
	});

	models.DataCenterEquipment.belongsTo(models.Equipment, {
		foreignKey: 'IdEquipment',
		as: 'Equipments',
	});

	models.Equipment.belongsTo(models.DataCenterEquipment, {
		foreignKey: 'IdEquipment',
		as: 'Equipments'
	});

	models.Equipment.belongsTo(models.Brand, {
		as: 'Brand',
		foreignKey: 'IdBrand',
	});

	models.DataCenterEquipment.belongsTo(models.SLA, {
		as: 'SLA',
		foreignKey: 'IdSLA',
	});
	models.DataCenterEquipment.belongsTo(models.ContractTime, {
		as: 'ContractTime',
		foreignKey: 'IdContractTime',
	});

	models.ContractTime.hasMany(models.DataCenterEquipment, {
		as: 'ContractTime',
		foreignKey: 'IdContractTime',
	});

	models.Equipment.belongsTo(models.TypePart, {
		as: 'TypePart',
		foreignKey: 'IdTypePart',
	});

	models.Equipment.belongsTo(models.Provider, {
		as: 'Provider',
		foreignKey: 'IdProvider',
	});

	models.Order.belongsTo(models.GeneralStatus, {
		as: 'Status',
		foreignKey: 'IdStatus',
	});

	models.Order.belongsTo(models.Brand, {
		as: 'Brand',
		foreignKey: 'IdBrand',
	});

	models.Order.belongsTo(models.TypePart, {
		as: 'TypePart',
		foreignKey: 'IdTypePart',
	});

	models.Order.belongsTo(models.OwnerCompany, {
		as: 'OwnerCompany',
		foreignKey: 'IdOwnerCompany',
	});

	models.Order.belongsTo(models.Client, {
		as: 'Client',
		foreignKey: 'IdClient',
	});
	models.OrderLog.belongsTo(models.GeneralStatus, {
		as: 'Status',
		foreignKey: 'IdStatus',
	});
	// Parts

	models.Part.belongsTo(models.Store, {
		foreignKey: 'IdStore',
	});

	models.Part.belongsTo(models.Provider, {
		foreignKey: 'IdProvider',
	});

	models.RackStore.belongsTo(models.Store, {
		foreignKey: 'IdStore',
	});

	models.OperationPart.belongsTo(models.RackStore, {
		as: 'Rack',
		foreignKey: 'IdRack',
	});
	models.ChasisEquipment.hasMany(models.ComponentChasis, {
		foreignKey: 'IdChasis',
	});

	models.SupportOperator.associate(models);
	models.Quote.associate(models);
	models.StatusQuote.associate(models);
	models.CurrencyList.associate(models);
	models.OperatorContract.associate(models);
	models.BudgetContract.associate(models);
	models.ContractEngineer.associate(models);
	models.Task.associate(models);
	models.City.associate(models);
	models.Country.associate(models);
};

associateModels(sequelize);
syncDB(sequelize);
module.exports = sequelize;

//8136
//folio de reporte
/*31443182-1 fecha de resolucion 27*/
//Rama de Fabian excel update werehouse-excel-update
