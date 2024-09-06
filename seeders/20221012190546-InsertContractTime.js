'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'ContractTime',
			[
				{
					Duration: '3 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Duration: '6 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Duration: '9 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Duration: '12 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Duration: '18 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Duration: '24 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Duration: '30 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Duration: '36 Meses',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('ContractTime', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE ContractTime 	AUTO_INCREMENT=1;');
	},
};
