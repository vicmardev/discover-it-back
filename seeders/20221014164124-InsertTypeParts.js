'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'TypeParts',
				[
					{
						Name: 'Switch',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Tarjeta',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Fuente de Alimentacion',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'SSD',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Server',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Balancer',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Storage',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Multiequipo',
						Status: '1',
						Description: 'Seeders',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Accesorios Computo',
						Status: '1',
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
		await queryInterface.bulkDelete('TypeParts', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE TypeParts 	AUTO_INCREMENT=1;');
	},
};
