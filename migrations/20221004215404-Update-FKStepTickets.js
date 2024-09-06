'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE StepTickets ADD CONSTRAINT FK_StepTickets FOREIGN KEY (IdTicketCategory) REFERENCES TicketsCategorys(IdTicketCategorys) ON UPDATE RESTRICT ON DELETE RESTRICT;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE StepTickets DROP CONSTRAINT  FK_StepTickets;'
		);
	},
};
