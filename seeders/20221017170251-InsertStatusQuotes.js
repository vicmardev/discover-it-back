'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'StatusQuotes',
				[
					{
						Status: 'RFI',
						Description: 'Estado Uno',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'RFQ',
						Description: 'Estado dos',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Status: 'RFP',
						Description: 'Estado Tres',
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
		await queryInterface.bulkDelete('StatusQuotes', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE StatusQuotes 	AUTO_INCREMENT=1;');
	},
};
