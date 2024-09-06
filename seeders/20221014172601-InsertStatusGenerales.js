'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'StatusGenerales',
				[
					{
						Status: 'Aceptado',
						Dashboard: 'OrderPurchase',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'En Proceso',
						Dashboard: 'OrderPurchase',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'Cancelado',
						Dashboard: 'OrderPurchase',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'Cambio SOW',
						Dashboard: 'Quote',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'Cancelado',
						Dashboard: 'Quote',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'En progreso',
						Dashboard: 'Quote',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'Ganado',
						Dashboard: 'Quote',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'Perdido',
						Dashboard: 'Quote',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'Rechazado',
						Dashboard: 'OrderPurchase',
						Description: 'Seeders',
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
		await queryInterface.bulkDelete('StatusGenerales', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query(
			'ALTER TABLE StatusGenerales 	AUTO_INCREMENT=1;'
		);
	},
};
