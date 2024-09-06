'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Quotes ADD CONSTRAINT FK_Quotes FOREIGN KEY (IdCustomer) REFERENCES Clients(IdClient) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Quotes2 FOREIGN KEY (IdQuote) REFERENCES StatusQuotes(id) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Quotes DROP CONSTRAINT  FK_Quotes, DROP CONSTRAINT  FK_Quotes2;'
		);
	},
};
