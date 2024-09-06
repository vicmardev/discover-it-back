'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Contracts ADD CONSTRAINT FK_Contracts FOREIGN KEY (IdClient) REFERENCES Clients(IdClient) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Contracts2 FOREIGN KEY (IdOrder) REFERENCES OrderPurchase(IdOrder) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Contracts3 FOREIGN KEY (IdOwnerCompany) REFERENCES OwnerCompany(IdOwnerCompany) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Contracts DROP CONSTRAINT  FK_Contracts, DROP CONSTRAINT  FK_Contracts2, DROP CONSTRAINT  FK_Contracts3;'
		);
	},
};
