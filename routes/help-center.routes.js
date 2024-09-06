const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');

const helpCenterController = require('controllers/help-center.controller');

router.get('/', helpCenterController.getAllFaqs);
router.get('/:id', helpCenterController.getFaqById);
router.post('/', authorize(Role.Admin),helpCenterController.createFaq);
router.post('/contact-support', helpCenterController.contactSupportSchema,helpCenterController.contactSupport);
router.put('/:id', authorize(Role.Admin),helpCenterController.updateSchema, helpCenterController.updateFaq);
router.patch('/:id', authorize(Role.Admin),helpCenterController.updateFaqStatus);
module.exports = router;
