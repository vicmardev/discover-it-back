const express = require('express');
const router = express.Router();
const authorize = 'middleware/authorize';
const Role = require('helpers/role');

const partsWerehouseController = require('controllers/parts-werehouse.controller');
//TODO: secure endpoints with authorize
router.post('/', partsWerehouseController.createPart);
router.get('/', partsWerehouseController.getAllparts);
router.get('/partTypes', partsWerehouseController.getPartField);
router.put('/v2', partsWerehouseController.createPartSequelize);
router.get('/v2', partsWerehouseController.getAllPartsSequelize);
router.get('/v2/relatedParts', partsWerehouseController.getRelatedPartsSequelize);
router.post('/contact-storer', partsWerehouseController.contactStorer);
router.post('/check', partsWerehouseController.verifyItems);
router.post('/addParts', partsWerehouseController.addItems);
router.get('/relatedParts', partsWerehouseController.getRelatedParts);
router.get('/availableParts', partsWerehouseController.getAvailableParts);
router.put('/assingPart/:id', partsWerehouseController.updatePart);
router.post('/v2/:serial', partsWerehouseController.createOperationPart);
router.put('/:serial', partsWerehouseController.updatePartByserial);

router.patch('', partsWerehouseController.substractParts);

module.exports = router;
