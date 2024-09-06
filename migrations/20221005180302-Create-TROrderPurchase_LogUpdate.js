'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
			'CREATE TRIGGER OrderPurchase_LogUpdate AFTER      UPDATE ON OrderPurchase FOR EACH ROW BEGIN      INSERT INTO OrderPurchase_Log(            IdOrder, IdClient,           NumOrder,             ACTION,            IdStatus, USER,            UserClient,            Comments,            IdOwnerCompany,            TotalEquipments,            Services,            Subtotal,            IdTypePart,            IdBrand                                ) VALUES       (      NEW.IdOrder,   NEW.IdClient,   NEW.NumOrder,            "Update",      NEW.IdStatus,      NEW.User,      NEW.UserClient,      NEW.Comments,      NEW.IdOwnerCompany,      NEW.TotalEquipments,      NEW.Services,      NEW.Subtotal,      NEW.IdTypePart,      NEW.IdBrand      ); END;'
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.sequelize.query('DROP TRIGGER OrderPurchase_LogUpdate;');
	},
};
