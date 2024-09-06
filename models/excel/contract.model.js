const contractStatus = {
	ACTIVO: 'Active',
	'1año': 'Active',
	nan: 'Active',
	SUSPENDIDO: 'Suspended',
	Active: 'Active',
	Suspended: 'Suspended',
	Complete: 'Complete',
	Activo: 'Active',
	Suspendido: 'Suspended',
	Complete: 'Complete',
};

module.exports = {
	schema: {
		Contract: {
			prop: 'Contract',
			required: true,
			type: String,
		},

		IdClient: {
			prop: 'IdClient',
			type: String,
		},

		Order: {
			prop: 'Order',
			type: String,
			required: true,
		},
		IdOwnerCompany: {
			prop: 'IdOwnerCompany',
			type: String,
		},
		Months: {
			prop: 'Months',
			type: String,
			required: true,
		},
		Status: {
			prop: 'Status',
			required: true,
			type: value => {
				return contractStatus[value];
			},
		},

		StartContract: {
			prop: 'StartContract',
			required: true,
			type: Date,
		},

		EndContract: {
			prop: 'EndContract',
			required: true,
			type: Date,
		},

		Alias: {
			prop: 'Alias',
			required: false,
			type: String,
		},
		Year: {
			prop: 'Year',
			required: false,
			type: String,
		},
		OrderNumber: {
			prop: 'OrderNumber',
			required: true,
			type: String,
		},
		OwnerCompany: {
			prop: 'OwnerCompany',
			required: true,
			type: String,
		},

		// Not a real column in the excel file
		DataCenters: {
			prop: 'DataCenter',
			required: true,
			type: {
				City: {
					prop: 'City',
					required: false,
					type: String,
				},
				Country: {
					prop: 'Country',
					required: true,
					type: String,
				},
				PostalCode: {
					prop: 'PostalCode',
					required: false,
					type: String,
				},
				Delegation: {
					prop: 'Delegation',
					required: true,
					type: String,
				},
				Street: {
					prop: 'Street',
					required: true,
					type: String,
				},
				Neighborhood: {
					prop: 'Neighborhood',
					required: false,
					type: String,
				},
				DataCenter: {
					prop: 'DataCenter',
					required: true,
					type: String,
				},
				InternalNumber: {
					prop: 'InternalNumber',
					required: false,
					type: String,
				},
				ExternalNumber: {
					prop: 'ExternalNumber',
					required: false,
					type: String,
				},
			},
		},
	},
};
