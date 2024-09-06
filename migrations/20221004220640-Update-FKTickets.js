'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Tickets ADD CONSTRAINT FK_Tickets FOREIGN KEY (IdContract) \
			REFERENCES Contracts(IdContract) ON UPDATE RESTRICT ON DELETE RESTRICT, \
			ADD CONSTRAINT FK_Tickets2 FOREIGN KEY (IdClient) REFERENCES Clients(IdClient) \
			ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Tickets3 FOREIGN KEY (IdDataCenter) \
			REFERENCES DataCenters(IdDataCenter) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Tickets4 FOREIGN KEY (IdUser) REFERENCES Users(IdUser) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Tickets5 FOREIGN KEY (IdEquipment) REFERENCES Equipments(IdEquipment) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Tickets6 FOREIGN KEY (IdSupportOPerators) REFERENCES SupportOperators(IdSupportOPerators) ON UPDATE RESTRICT ON DELETE RESTRICT, ADD CONSTRAINT FK_Tickets7 FOREIGN KEY (IdLevelScalation) REFERENCES LevelScalations(IdLevelScalation) ON UPDATE RESTRICT ON DELETE RESTRICT ;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'ALTER TABLE Tickets DROP CONSTRAINT  FK_Tickets, DROP CONSTRAINT  FK_Tickets2, DROP CONSTRAINT  FK_Tickets3, DROP CONSTRAINT  FK_Tickets4, DROP CONSTRAINT  FK_Tickets5, DROP CONSTRAINT  FK_Tickets6, DROP CONSTRAINT  FK_Tickets7;'
		);
	},
};
