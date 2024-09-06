module.exports = {
	schema: {
		Contract: {
			prop: 'Contract',
			required: true,
			type: String,
		},
		DataCenter: {
			prop: 'DataCenter',
			required: true,
			type: String,
		},
		Serial: {
			prop: 'Serial',
			required: true,
			type: String,
		},
		HardwareProvider: {
			prop: 'HardwareProvider',
			required: true,
			type: String,
		},
		SerialProvider: {
			prop: 'SerialProvider',
			required: true,
			type: String,
		},
		Brand: {
			prop: 'Brand',
			required: true,
			type: String,
		},

		Equipment: {
			prop: 'Equipment',
			required: true,
			type: String,
		},
		Model: {
			prop: 'Model',
			required: true,
			type: String,
		},

		// Not a real column in the excel file
		DataCenterEquipment: {
			prop: 'DataCenterEquipment',
			type: {
				SLA: {
					prop: 'SLA',
					required: false,
					type: String,
				},
				ServiceTag: {
					prop: 'ServiceTag',
					required: false,
					type: String,
				},
				IP: {
					prop: 'IP',
					required: false,
					type: String,
				},
			},
		},
	},
};
