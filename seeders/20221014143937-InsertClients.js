'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Clients',
			[
				{
					Name: 'ALPHA',
					Status: '1',
					Family: 'ALPHA',
					RegisteredName: '41PHAN3T SA DE CV',
					AdressFiscal: 'PROLONGACION PASEO DE LA REFORMA 51 Int: 602',
					RFC: 'PHA210305SA3',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Name: 'KIO-METRO',
					Status: '1',
					Family: 'KIO',
					RegisteredName: 'METRO NET HOSTING S DE RL DE CV',
					AdressFiscal: 'PASEO DE LA REFORMA 5287',
					RFC: 'MNH0004267T8',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Name: 'VIRWO',
					Status: '1',
					Family: 'VIRWO',
					RegisteredName: '41PHAN3T SA DE CV',
					AdressFiscal: 'PROLONGACION PASEO DE LA REFORMA 51 Int: 602',
					RFC: 'PHA210305SA3',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Name: 'KIO NETWORKS',
					Status: '1',
					Family: 'KIO',
					RegisteredName: 'SIXSIGMA NETWORKS MEXICO SA DE CV',
					AdressFiscal:
						'Prolongaciòn Paseo de la Reforma 5287 Cuajimalpa de Morelos DF Mexico 05000',
					RFC: 'SNM010323EB5',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					Name: 'Kio Networks',
					Status: '1',
					Family: 'KIO',
					RegisteredName: 'METRO NET HOSTING S DE RL DE CV',
					AdressFiscal:
						'Prolongaciòn Paseo de la Reforma 5287 Cuajimalpa de Morelos DF Mexico 05000',
					RFC: 'MNH0004267T8',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Clients', null, {
			truncate: {cascade: true},
		});
		return queryInterface.sequelize.query('ALTER TABLE Clients 	AUTO_INCREMENT=1;');
	},
};
