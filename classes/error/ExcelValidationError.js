class ExcelValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = 'Error';
	}
}

module.exports.ExcelValidationError = ExcelValidationError;
