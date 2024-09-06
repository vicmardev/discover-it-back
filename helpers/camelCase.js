const toUpperCamelCase = object => {
	let newObject, newKey, value;
	//check if array has objects inside
	if (object instanceof Array) {
		return object.map(function (value) {
			if (typeof value === 'object') {
				//recursive to change keys
				value = toUpperCamelCase(value);
			}
			return value;
		});
	} else {
		newObject = {};
		for (let key in object) {
			if (object.hasOwnProperty(key)) {
				newKey = (key.charAt(0).toUpperCase() + key.slice(1) || key).toString();
				value = object[key];
				if (value instanceof Array || (value !== null && value.constructor === Object)) {
					value = toUpperCamelCase(value);
				}
				newObject[newKey] = value;
			}
		}
	}
	return newObject;
};

module.exports = toUpperCamelCase;
