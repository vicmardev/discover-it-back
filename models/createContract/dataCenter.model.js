module.exports = {
	schema: {
		IdContract: {
			prop: 'IdContract',
			required: true,
			type: Number,
		},
		City: {
			prop: 'City',
			required: true,
			type: String,
		},
		Country: {
			prop: 'Country',
			required: true,
			type: String,
		},
		Delegation: {
			prop: 'Delegation',
			required: true,
			type: String,
		},
		Neighborhood: {
			prop: 'Neighborhood',
			required: true,
			type: String,
		},
		PostalCode: {
			prop: 'PostalCode',
			required: true,
			type: String,
		},
		Street: {
			prop: 'Street',
			required: true,
			type: String,
		},
		InternalNumber: {
			prop: 'InternalNumber',
			required: true,
			type: String,
		},
		ExternalNumber: {
			prop: 'ExternalNumber',
			required: true,
			type: String,
		},
		DataCenter: {
			prop: 'DataCenter',
			required: true,
			type: String,
		},
		Latitud: {
			prop: 'ExternalNumber',
			required: false,
			type: String,
		},
		Longitud: {
			prop: 'Longitud',
			required: false,
			type: String,
		},
	},
};
