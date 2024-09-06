const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('helpers/send-email');
const db = require('database/db');
const Role = require('helpers/role');
const fs = require('fs');
const {response} = require('express');

module.exports = {
	authenticateUser,
	refreshUserToken,
	revokeUserToken,
	registerUser,
	verifyUserEmail,
	recoverUserPassword,
	validateUserResetToken,
	resetUserPassword,
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	updateContract,
	deleteItemContract,
};

async function authenticateUser({email, password, ipAddress}) {
	const account = await db.Account.findOne({email});

	if (account && account.banTime && Date.parse(account.banTime) != Date.parse(0)) {
		const start = Date.parse(account.banTime) / 1000;
		const minute = 600000;
		let remainingBanTime = banDuration(start);
		if (remainingBanTime.minutes < 10)
			throw `User is banned for ${10 - remainingBanTime.minutes} minutes`;
		else if (remainingBanTime.minutes >= 10 && remainingBanTime.minutes < 11)
			throw `User is banned for ${60 - remainingBanTime.seconds} seconds`;
		else {
			account.loginAttemps = 0;
			// have to use Date.parse(0) to keep the date consistent and keep bugs out
			account.banTime = Date.parse(0);
			await account.save();
		}
	}
	if (account && !bcrypt.compareSync(password, account.passwordHash)) {
		account.loginAttemps++;
		await account.save();
		/**set user ban for ten minutes
		 * time in milliseconds
		 * 1000 = 1s
		 * 60000 = 1 min
		 * 300000 = 5 min
		 * 3600000 = 1 hr
		 * 864000000 = 1 d
		 */
		if (account.loginAttemps > 3) {
			account.banTime = Date.now();
			await account.save();
			throw `El usuario intento 3 veces ingresar. El usuario esta  bloqueado por 10 min.`;
		}
		throw `Email o contraseña incorrectos. Intento: ${account.loginAttemps}`;
	}
	if (
		!account ||
		(!account.isVerified && !bcrypt.compareSync(password, account.passwordHash))
	) {
		throw 'Email or contraseña son incorrectos.';
	}
	//uesr logged in
	account.loginAttemps = 0;
	account.statusLogin = true;
	await account.save();

	// authentication successful so generate jwt and refresh tokens
	const jwtToken = generateJwtToken(account);
	const refreshToken = generateRefreshToken(account, ipAddress);

	// save refresh token
	await refreshToken.save();

	// return basic details and tokens
	return {
		...basicDetails(account),
		jwtToken,
		refreshToken: refreshToken.token,
	};
}

async function refreshUserToken({token, ipAddress}) {
	const refreshToken = await getRefreshToken(token);
	const {account} = refreshToken;

	// replace old refresh token with a new one and save
	const newRefreshToken = generateRefreshToken(account, ipAddress);
	refreshToken.revoked = Date.now();
	refreshToken.revokedByIp = ipAddress;
	refreshToken.replacedByToken = newRefreshToken.token;
	await refreshToken.save();
	await newRefreshToken.save();

	// generate new jwt
	const jwtToken = generateJwtToken(account);

	// return basic details and tokens
	return {
		...basicDetails(account),
		jwtToken,
		refreshToken: newRefreshToken.token,
	};
}

async function revokeUserToken({token, ipAddress}) {
	const refreshToken = await getLogOut(token);

	// revoke token and save
	refreshToken.revoked = Date.now();
	refreshToken.revokedByIp = ipAddress;
	await refreshToken.save();
}

async function registerUser(params, origin) {
	// validate
	if (await db.Account.findOne({email: params.email})) {
		// send already registered error in email to prevent account enumeration
		return await sendAlreadyRegisteredEmail(params.email, origin);
	}
	// create account object
	const account = new db.Account(params);

	// first registered account is an admin
	const isFirstAccount = (await db.Account.countDocuments({})) === 0;
	account.role = isFirstAccount ? Role.Admin : Role.User;
	account.verificationToken = randomTokenString();
	// hash password
	account.passwordHash = hash(params.password);

	// save account
	await account.save();

	// send email
	await sendAdminUserVerificationEmail(account, origin);
}

async function verifyUserEmail({token, email}, origin) {
	const account = await db.Account.findOne({verificationToken: token});
	if (!account) throw 'Verification failed';
	account.resetToken = {
		token: randomTokenString(),
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
	};
	account.verified = Date.now();
	account.verificationToken = undefined;
	await account.save();

	await sendVerificationEmail(account, origin);
}

async function recoverUserPassword({email}, origin) {
	const account = await db.Account.findOne({email});

	// always return ok response to prevent email enumeration
	if (!account) return;

	// create reset token that expires after 24 hours
	account.resetToken = {
		token: randomTokenString(),
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
	};
	await account.save();

	// send email
	await sendPasswordResetEmail(account, origin);
}

async function validateUserResetToken({token}) {
	const account = await db.Account.findOne({
		'resetToken.token': token,
		'resetToken.expires': {$gt: Date.now()},
	});

	if (!account) throw 'Invalid token';
}

async function resetUserPassword({token, password}) {
	const account = await db.Account.findOne({
		'resetToken.token': token,
		'resetToken.expires': {$gt: Date.now()},
	});

	if (!account) throw 'Invalid token';

	// update password and remove reset token
	account.passwordHash = hash(password);
	account.passwordReset = Date.now();
	account.resetToken = undefined;
	await account.save();
}

async function getAllUsers() {
	const accounts = await db.Account.find();
	return accounts.map(x => basicDetails(x));
}

async function getUserById(id) {
	const account = await getAccount(id);
	return basicDetails(account);
}

async function createUser(params) {
	// validate
	if (await db.Account.findOne({email: params.email})) {
		throw 'Email "' + params.email + '" is already registered';
	}
	const account = new db.Account(params);
	account.verified = Date.now();

	// hash password
	account.passwordHash = hash(params.password);

	// save account
	await account.save();

	return basicDetails(account);
}

async function updateUser(id, params, files) {
	const account = await getAccount(id);

	if (files) {
		let file = files.fileUpload;
		let fileDir = `uploads/${params.lastName}/${params.firstName}`;
		let filePath = `${fileDir}/${file.name}`;
		params.avatarImagePath = filePath;
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, {recursive: true});
		}
		fs.writeFile(filePath, file.data, 'binary', function (err) {
			if (err) throw err;
		});
	}

	// validate (if email was changed)
	if (
		params.email &&
		account.email !== params.email &&
		(await db.Account.findOne({email: params.email}))
	) {
		throw 'Email "' + params.email + '" is already taken';
	}

	// hash password if it was entered
	if (params.password) {
		params.passwordHash = hash(params.password);
	}

	// copy params to account and save
	Object.assign(account, params);
	account.updated = Date.now();
	await account.save();

	return basicDetails(account);
}

async function deleteUser(id) {
	const account = await getAccount(id);
	await account.remove();
}

// helper functions

async function getAccount(id) {
	if (!db.isValidId(id)) throw 'Account not found';
	const account = await db.Account.findById(id);
	if (!account) throw 'Account not found';
	return account;
}

async function getRefreshToken(token) {
	const refreshToken = await db.RefreshToken.findOne({token}).populate('account');
	const tokenUser = await db.RefreshToken.findOne({token});
	let usuarioID = tokenUser.account;
	if (usuarioID) {
		const cuenta = await db.Account.findOne(usuarioID);
		const stattusOff = await db.Account.updateOne(
			{_id: {$eq: usuarioID}},
			{$set: {statusLogin: true}}
		);
	}
	if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
	return refreshToken;
}
async function getLogOut(token) {
	const refreshToken = await db.RefreshToken.findOne({token}).populate('account');
	const tokenUser = await db.RefreshToken.findOne({token});
	let usuarioID = tokenUser.account;
	if (usuarioID) {
		const cuenta = await db.Account.findOne(usuarioID);
		const stattusOff = await db.Account.updateOne(
			{_id: {$eq: usuarioID}},
			{$set: {statusLogin: false}}
		);
	}
	if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
	return refreshToken;
}

function hash(password) {
	return bcrypt.hashSync(password, 10);
}

function generateJwtToken(account) {
	// create a jwt token containing the account id that expires in 240 minutes (4 hrs)
	return jwt.sign({sub: account.id, id: account.id}, config.secret, {expiresIn: '240m'});
}

function generateRefreshToken(account, ipAddress) {
	// create a refresh token that expires in 7 days
	return new db.RefreshToken({
		account: account.id,
		token: randomTokenString(),
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		createdByIp: ipAddress,
	});
}

function randomTokenString() {
	return crypto.randomBytes(40).toString('hex');
}

function basicDetails(account) {
	const {
		id,
		firstName,
		lastName,
		email,
		role,
		created,
		updated,
		isVerified,
		avatarImagePath,
		statusLogin,
		contrato,
	} = account;
	return {
		id,
		firstName,
		lastName,
		email,
		role,
		created,
		updated,
		isVerified,
		avatarImagePath,
		statusLogin,
		contrato,
	};
}

async function sendVerificationEmail(account, origin) {
	let message;
	if (origin) {
		const verifyUrl = `${origin}/account/reset-password?token=${account.resetToken.token}`;
		message = `<p>Correo Registrado con Exito.</p>
                   <p> Por motivos de Seguridad da click en el Enlace para crear tu nueva contraseña
                   y poder acceder de manera segura. </p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
	} else {
		message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.resetToken}</code></p>`;
	}

	await sendEmail({
		to: account.email,
		/* subject: 'Sign-up Verification API - Verify Email', */
		subject: 'Verificación Discover IT',
		html: `<h1>VERIFICACIÓN DE CORREO</h1>
               <p>Gracias por registrarse!</p>
               ${message}`,
	});
}

async function sendAdminUserVerificationEmail(account, origin) {
	let message;
	if (origin) {
		const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}&email=${account.email}&name=${account.firstName} ${account.lastName}&contrato=${account.contrato}`;
		message = `<p>El usuario ${account.firstName} ${account.lastName} con el contrato ${account.contrato}
                   está solicitando acceso a la plataforma.</p>
                   <p> Por motivos de Seguridad da click en el Enlace para verificar al usuario.</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
	} else {
		message = `<p>Please use the below token to verify your email address with the <code>/account/verify-email</code> api route:</p>
                   <p><code>${account.resetToken}</code></p>`;
	}

	await sendEmail({
		// to:'alux@alphanetworks.mx',
		to: config.emailFrom,
		/* subject: 'Sign-up Verification API - Verify Email', */
		subject: 'Verificación Discover IT',
		html: `<h1>VERIFICACIÓN DE CORREO</h1>
               <p>Verificar a usuario</p>
               ${message}`,
	});
}

async function sendAlreadyRegisteredEmail(email, origin) {
	let message;
	if (origin) {
		message = `<p>If you don't know your password please visit the <a href="${origin}/account/forgot-password">forgot password</a> page.</p>`;
	} else {
		message = `<p>If you don't know your password you can reset it via the <code>/account/forgot-password</code> api route.</p>`;
	}

	await sendEmail({
		to: email,
		subject: 'Discover IT Sign-up - Email Already Registered',
		html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`,
	});
}

async function sendPasswordResetEmail(account, origin) {
	let message;
	if (origin) {
		const resetUrl = `${origin}/account/reset-password?token=${account.resetToken.token}`;
		message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>`;
	} else {
		message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken.token}</code></p>`;
	}

	await sendEmail({
		to: account.email,
		subject: 'Discover IT Sign-up - Reset Password',
		html: `<h4>Reset Password Email</h4>
               ${message}`,
	});
}

function banDuration(start) {
	//amount of miliseconds in a day
	const dayLength = 86400000;
	//amount of seconds in hour
	const hourLength = 3600000;
	const minuteLength = 600000;
	let now = new Date().getTime() / 1000;
	let timeDifference = now - start;
	let duration = 600000 * 10 - timeDifference;
	let days = Math.floor(timeDifference / dayLength);
	let hours = Math.floor((timeDifference % dayLength) / hourLength);
	let minutes = Math.floor(((timeDifference % dayLength) % hourLength) / 60);
	let seconds = Math.floor(timeDifference % 60);
	duration = timeDifference;
	return {duration, minutes, seconds};
}

async function updateContract(email, body) {
	let newContract = body;
	try {
		let whereExist = {email: email, contrato: {$in: newContract}};
		let queryExist = await db.Account.find(whereExist);
		//  const  query   =  await db.Equipment.find({"Contrato":{$in:salida}});
		/*  if contract  exist  */
		if (queryExist.length != 0) {
			return {
				description: 'El contrato ya  esta  registrado, para  este  usuario.',
				status: true,
			};
		} else {
			let where = {email: email};
			let newValues = {$push: {contrato: body}};
			let query = await db.Account.updateOne(where, newValues);

			return {
				description: 'Registra  contrato, para este  usuario.',
				status: false,
			};
		}
	} catch (error) {
		throw error;
	}
}

async function deleteItemContract(email, contract) {
	let itemContract = contract;
	try {
		let where = {email: email};
		let operation = {$pull: {contrato: itemContract}};
		const query = await db.Account.updateOne(where, operation, {multi: true});
		return query;
	} catch (error) {
		throw error;
	}
}
