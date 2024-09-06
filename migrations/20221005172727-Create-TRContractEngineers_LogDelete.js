'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'CREATE TRIGGER `ContractEngineers_LogDelete` AFTER DELETE ON `ContractEngineers` FOR EACH ROW BEGIN         INSERT INTO ContractEngineers_Log      (	IdContract,        IdEngineer,        ACTION,       IdUser       ) VALUES      (old.IdContract,       old.IdEngineer,      "Delete",      IdUser);       END;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP TRIGGER ContractEngineers_LogDelete;');
	},
};
