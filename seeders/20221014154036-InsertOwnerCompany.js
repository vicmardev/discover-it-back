'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'OwnerCompany',
				[
					{
						Name: 'Alpha Networks',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Virwo',
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
		await queryInterface.bulkDelete('OwnerCompany', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE OwnerCompany 	AUTO_INCREMENT=1;');
	},
};
