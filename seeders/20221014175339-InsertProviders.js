'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.bulkInsert(
				'Providers',
				[
					{
						Name: 'Alphanetworks',
						Status: '',
						NameContact: 'Juan Ponce',
						PhoneContact: '5512345678',
						EmailContact: 'juan.ponce@virwo.com',
						City: 'Mexico',
						Country: 'Ciudad de Mexico',
						Delegation: 'Cuajimalpa',
						PostalCode: 50505,
						InternalNumber: 20,
						ExternalNumber: 50,
						Comments: '',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'Octopian',
						Status: '',
						NameContact: 'Luis Carlos',
						PhoneContact: '5512345678',
						EmailContact: 'luis.carlos@virwo.com',
						City: 'Mexico',
						Country: 'Ciudad de Mexico',
						Delegation: 'Cuajimalpa',
						PostalCode: 50505,
						InternalNumber: 20,
						ExternalNumber: 50,
						Comments: '',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'SIXSIGMA',
						Status: '',
						NameContact: 'JSIXSIGMA',
						PhoneContact: '5512345678',
						EmailContact: 'luis.carlos@virwo.com',
						City: 'Mexico',
						Country: 'Ciudad de Mexico',
						Delegation: 'Cuajimalpa',
						PostalCode: 50505,
						InternalNumber: 20,
						ExternalNumber: 50,
						Comments: '',
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						Name: 'METRONET',
						Status: '',
						NameContact: 'METRONET',
						PhoneContact: '5512345678',
						EmailContact: 'luis.carlos@virwo.com',
						City: 'Mexico',
						Country: 'Ciudad de Mexico',
						Delegation: 'Cuajimalpa',
						PostalCode: 50505,
						InternalNumber: 20,
						ExternalNumber: 50,
						Comments: '',
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
		await queryInterface.bulkDelete('Providers', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE Providers 	AUTO_INCREMENT=1;');
	},
};
