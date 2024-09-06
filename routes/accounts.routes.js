const express = require('express');
const router = express.Router();

const authorize = require('middleware/authorize');
const Role = require('helpers/role');
const accountController = require('controllers/account.controller');
// routes
router.post('/authenticate', accountController.authenticateUserSchema, accountController.authenticateUser);
router.post('/refresh-token', accountController.refreshUserToken);
router.post('/revoke-token', authorize(), accountController.revokeUserTokenSchema, accountController.revokeUserToken);
router.post('/register', accountController.registerUserSchema, accountController.registerUser);
router.post('/verify-email', accountController.verifyUserEmailSchema, accountController.verifyUserEmail);
router.post('/forgot-password', accountController.recoverUserPasswordSchema, accountController.recoverUserPassword);
router.post('/validate-reset-token', accountController.validateUserResetTokenSchema, accountController.validateUserResetToken);
router.post('/reset-password', accountController.resetUserPasswordSchema, accountController.resetUserPassword);
router.get('/', authorize(Role.Admin), accountController.getAllUsers);
router.get('/:id', authorize(), accountController.getUserById);
router.post('/', authorize(Role.Admin), accountController.createUserSchema, accountController.createUser);
router.put('/:id', authorize(), accountController.updateUserSchema, accountController.updateUser);
router.delete('/:id', authorize(), accountController.deleteUser);
router.put('/listContrats/:email',accountController.updateContractuser);
router.delete('/itemList/:email/:contract',accountController.deleteItemContract);

module.exports = router;