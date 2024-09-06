'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'CurrencyList',
				[
					{
						IdCurrency: 48,
						CurrencyCode: 'MXN',
						CurrencyName: 'Mexican Peso',
						Status: 1,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						IdCurrency: 77,
						CurrencyCode: 'USD',
						CurrencyName: 'US Dollar',
						Status: 1,
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
		await queryInterface.bulkDelete('CurrencyList', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE CurrencyList 	AUTO_INCREMENT=1;');
	},
};
