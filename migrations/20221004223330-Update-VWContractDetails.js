'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'CREATE VIEW ContractDetailsV AS select `Contracts`.`IdContract` AS `IdContract`,`Contracts`.`Contract` AS `Contract`,`Clients`.`Name` AS `Clients`,`Contracts`.`Alias` AS `Alias`,`Contracts`.`Status` AS `Status`,`CurrencyList`.`CurrencyCode` AS `CurrencyCode`,`BudgetContracts`.`BudgetHR` AS `BudgetHR`,`BudgetContracts`.`BudgetProviders` AS `BudgetProviders`,`BudgetContracts`.`Budget` AS `Budget` from (`Contracts` join ((`BudgetContracts` join `Clients`) join `CurrencyList`) on(`Contracts`.`IdContract` = `BudgetContracts`.`IdContract` and `Contracts`.`IdClient` = `Clients`.`IdClient` and `BudgetContracts`.`IdCurrency` = `CurrencyList`.`IdCurrency`));'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP VIEW ContractDetailsV;');
	},
};
