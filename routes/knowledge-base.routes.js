const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize')
const Role = require('helpers/role');

const KnowledgeBaseController = require('controllers/knowledge-base.controller')

router.get('/', authorize(), KnowledgeBaseController.getKnowledgeBase);
router.delete('/:id', authorize(Role.Admin), KnowledgeBaseController.deleteKnowledgeBaseNode);
router.post('/:DeviceFieldUse/:DeviceType/:DeviceBrand/:Device', authorize(Role.Admin), KnowledgeBaseController.createSchema, KnowledgeBaseController.createKnowledgeBaseEntry);
router.put('/:DeviceFieldUse/:DeviceType/:DeviceBrand/:Device', authorize(Role.Admin), KnowledgeBaseController.updateSchema, KnowledgeBaseController.updateKnowledgeBaseEntry);


module.exports = router;