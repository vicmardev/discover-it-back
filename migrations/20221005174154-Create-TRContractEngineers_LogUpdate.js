'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'CREATE TRIGGER `ContractEngineers_LogUpdate` AFTER UPDATE ON `ContractEngineers` FOR EACH ROW BEGIN       INSERT INTO ContractEngineers_Log       (	IdContract,         IdEngineer,         ACTION,        IdUser        ) VALUES       (NEW.IdContract,        NEW.IdEngineer,       "Update",       IdUser);        END;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP TRIGGER ContractEngineers_LogUpdate;');
	},
};
