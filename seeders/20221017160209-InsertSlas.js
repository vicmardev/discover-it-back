'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'SLAs',
				[
					{
						Name: '24x7x4',
						Description: '',
						Status: '1',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: '8x5xNBD',
						Description: '',
						Status: '1',
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
		await queryInterface.bulkDelete('SLAs', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE SLAs 	AUTO_INCREMENT=1;');
	},
};
