'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'Countries',
				[
					{
						IdCountry: 484,
						Name: 'México',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						IdCountry: 840,
						Name: 'United States of America',
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
		await queryInterface.bulkDelete('Countries', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE Countries 	AUTO_INCREMENT=1;');
	},
};
