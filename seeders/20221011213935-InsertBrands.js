'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Brands',
			[
				{
					NameBrand: 'Huawei',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'HP',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'CISCO',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'ARISTA',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'BROCADE',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'EXTREME',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'F5',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'LENOVO',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'IBM',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'DELL',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'EMC/DELL',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'ORACLE',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					NameBrand: 'Multimarca',
					Status: '1',
					Description: 'Seeders',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Brands', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE Brands 	AUTO_INCREMENT=1;');
	},
};
