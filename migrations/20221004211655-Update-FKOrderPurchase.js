'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE OrderPurchase ADD CONSTRAINT FK_OrderPurchase FOREIGN KEY (IdStatus) REFERENCES StatusGenerales(IdStatus) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_OrderPurchase2 FOREIGN KEY (IdOwnerCompany) REFERENCES OwnerCompany(IdOwnerCompany) ON UPDATE RESTRICT ON DELETE RESTRICT,ADD CONSTRAINT FK_OrderPurchase3 FOREIGN KEY (IdTypePart) REFERENCES TypeParts(IdTypePart) ON UPDATE RESTRICT ON DELETE RESTRICT,ADD CONSTRAINT FK_OrderPurchase4 FOREIGN KEY (IdBrand) REFERENCES Brands(IdBrand) ON UPDATE RESTRICT ON DELETE RESTRICT,ADD CONSTRAINT FK_OrderPurchase5 FOREIGN KEY (IdClient) REFERENCES Clients(IdClient) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE OrderPurchase DROP CONSTRAINT  FK_OrderPurchase, DROP CONSTRAINT  FK_OrderPurchase2, DROP CONSTRAINT  FK_OrderPurchase3, DROP CONSTRAINT  FK_OrderPurchase4, DROP CONSTRAINT FK_OrderPurchase5;'
		);
	},
};
