'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE ContractEngineers ADD CONSTRAINT FK_ContractEngineers FOREIGN KEY (IdEngineer) REFERENCES SupportOperators(IdSupportOperators) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE ContractEngineers DROP CONSTRAINT  FK_ContractEngineers;'
		);
	},
};
