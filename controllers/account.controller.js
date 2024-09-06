const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');
const accountService = require('services/account.service');



module.exports = {
    authenticateUserSchema,
    authenticateUser,
    refreshUserToken,
    revokeUserTokenSchema,
    revokeUserToken,
    registerUserSchema,
    registerUser,
    verifyUserEmailSchema,
    verifyUserEmail,
    recoverUserPasswordSchema,
    recoverUserPassword,
    validateUserResetTokenSchema,
    validateUserResetToken,
    resetUserPasswordSchema,
    resetUserPassword,
    getAllUsers,
    getUserById,
    createUserSchema,
    createUser,
    updateUserSchema,
    updateUser,
    deleteUser,
    updateContractuser,
    deleteItemContract

};

function authenticateUserSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticateUser(req, res, next) {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    accountService.authenticateUser({ email, password, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken);
            res.json(account);
        })
        .catch(next);
}

function refreshUserToken(req, res, next) {
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    accountService.refreshUserToken({ token, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken);
            res.json(account);
        })
        .catch(next);
}

function revokeUserTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function revokeUserToken(req, res, next) {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;

    if (!token) return res.status(400).json({ message: 'Token is required' });

    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.user.ownsToken(token) && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    accountService.revokeUserToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next);
}

function registerUserSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        acceptTerms: Joi.boolean().valid(true).required(),
        contrato: Joi.string()
    });
    validateRequest(req, next, schema);
}

function registerUser(req, res, next) {
    if (req.body.contrato) req.body.contrato = req.body.contrato.toString().split(",");

    accountService.registerUser(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Registration successful, please check your email for verification instructions' }))
        .catch(next);
}

function verifyUserEmailSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        email: Joi.string(),
        name: Joi.string(),
        contrato: Joi.array().items(Joi.string())
    });
    validateRequest(req, next, schema);
}

function verifyUserEmail(req, res, next) {
    accountService.verifyUserEmail(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next);
}

function recoverUserPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    });
    validateRequest(req, next, schema);
}

function recoverUserPassword(req, res, next) {
    accountService.recoverUserPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}

function validateUserResetTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function validateUserResetToken(req, res, next) {
    accountService.validateUserResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next);
}

function resetUserPasswordSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function resetUserPassword(req, res, next) {
    accountService.resetUserPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next);
}

function getAllUsers(req, res, next) {
    accountService.getAllUsers()
        .then(accounts => res.json(accounts))
        .catch(next);
}

function getUserById(req, res, next) {
    // users can get their own account and admins can get any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    accountService.getUserById(req.params.id)
        .then(account => account ? res.json(account) : res.sendStatus(404))
        .catch(next);
}

function createUserSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        contrato:Joi.string()
    });
    validateRequest(req, next, schema);
}

function createUser(req, res, next) {
    if (req.body.contrato) req.body.contrato = req.body.contrato.toString().split(",");
    accountService.createUser(req.body)
        .then(account => res.json(account))
        .catch(next);
}

function updateUserSchema(req, res, next) {
    const schemaRules = {
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty(''),
        contrato:Joi.string()
        
    };

    // only admins can update role
    if (req.user.role === Role.Admin) {
        schemaRules.role = Joi.string().valid(Role.Admin, Role.User).empty('');
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}

function updateUser(req, res, next) {
    // users can update their own account and admins can update any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (req.body.contrato) req.body.contrato = req.body.contrato.toString().split(",");
    accountService.updateUser(req.params.id, req.body, req.files)
        .then(account => res.json(account))
        .catch(next);
}


function deleteUser(req, res, next) {
    // users can delete their own account and admins can delete any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    accountService.deleteUser(req.params.id)
        .then(() => res.json({ message: 'Account deleted successfully' }))
        .catch(next);
}

// helper functions

function setTokenCookie(res, token) {
    // create cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    };
    res.cookie('refreshToken', token, cookieOptions);
}

function  updateContractuser(req, res, next){
    let  email = req.params.email;
    let  lista =  Object.values(req.body)
    accountService.updateContract(email,lista)
    .then(listContract => res.json(listContract))
    .catch(next);

}

function deleteItemContract(req,res,next){
    let  email = req.params.email;
    let  contract =  req.params.contract;
    accountService.deleteItemContract(email,contract)
    .then(itemContract => res.json(itemContract))
    .catch(next);


}
