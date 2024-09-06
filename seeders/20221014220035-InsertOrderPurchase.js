'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'OrderPurchase',
				[
					{
						IdClient: 1,
						IdStatus: 1,
						IdOwnerCompany: 2,
						IdTypePart: 5,
						IdBrand: 13,
						NumOrder: 123456789,
						DateReceptionEmail: new Date(),
						User: 'ivan.pillado@virwo.com',
						UserClient: 'Eduardo Orta',
						UrlOrderFile: 'uploads/orders/4500100909.pdf',
						Comments: 'todo  correcto',
						EmailUserFinal: 'eorat@kionetworks.com',
						TotalEquipments: 1,
						Services: 'Activacion de servicio de soporte',
						Subtotal: 53000,
						StatusOrder: 1,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						IdClient: 2,
						IdStatus: 1,
						IdOwnerCompany: 2,
						IdTypePart: 5,
						IdBrand: 13,
						NumOrder: 1234567810,
						DateReceptionEmail: new Date(),
						User: 'ivan.pillado@virwo.com',
						UserClient: 'Eduardo Orta',
						UrlOrderFile: 'uploads/orders/4500100909.pdf',
						Comments: 'todo  correcto',
						EmailUserFinal: 'eorat@kionetworks.com',
						TotalEquipments: 2,
						Services: 'Activacion de servicio de soporte',
						Subtotal: 54000,
						StatusOrder: 1,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						IdClient: 3,
						IdStatus: 1,
						IdOwnerCompany: 2,
						IdTypePart: 8,
						IdBrand: 13,
						NumOrder: 1234567811,
						DateReceptionEmail: new Date(),
						User: 'ivan.pillado@virwo.com',
						UserClient: 'Eduardo Orta',
						UrlOrderFile: 'uploads/orders/4500100909.pdf',
						Comments: 'todo  correcto',
						EmailUserFinal: 'eorat@kionetworks.com',
						TotalEquipments: 3,
						Services: 'Activacion de servicio de soporte',
						Subtotal: 55000,
						StatusOrder: 1,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						IdClient: 1,
						IdStatus: 1,
						IdOwnerCompany: 2,
						IdTypePart: 8,
						IdBrand: 13,
						NumOrder: 4500100909,
						DateReceptionEmail: new Date(),
						User: 'ivan.pillado@virwo.com',
						UserClient: 'Eduardo Orta',
						UrlOrderFile: 'uploads/orders/4500100909.pdf',
						Comments: 'todo  correcto',
						EmailUserFinal: 'eorat@kionetworks.com',
						TotalEquipments: 3,
						Services: 'Activacion de servicio de soporte',
						Subtotal: 55000,
						StatusOrder: 1,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{}
			);
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('OrderPurchase', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE OrderPurchase 	AUTO_INCREMENT=1;');
	},
};
