'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE BudgetContracts ADD CONSTRAINT FK_BudgetContracts FOREIGN KEY (IdCurrency) REFERENCES CurrencyList(IdCurrency) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_BudgetContracts2 FOREIGN KEY (IdContract) REFERENCES Contracts(IdContract) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE BudgetContracts DROP CONSTRAINT  FK_BudgetContracts, DROP CONSTRAINT  FK_BudgetContracts2;'
		);
	},
};
