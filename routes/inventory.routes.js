const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');
const inventoryController = require('controllers/inventory.controller');

router.post('/createBudget', inventoryController.createBudget);

router.get('/tableBuilder', inventoryController.tableBuilder);
router.get('/engineers/:IdContract', inventoryController.getContractEngineersById);

router.delete(
	'/deleteEngineer/:IdContract/:IdEngineer',
	inventoryController.deleteEngineer
);

router.post('/availableEngineers', inventoryController.getAvailableEngineers);

router.get('/operators', inventoryController.getSupportOperators);
router.get('/budgets', inventoryController.getBudgetContracts);
router.get('/getCurrency', inventoryController.getCurrency);
router.get('/contractEngineers', inventoryController.getContractEngineers);
router.get('/searchContract/:IdContract', inventoryController.searchContract);
router.post('/setContractEngineers', inventoryController.setContractEngineers);

router.get('/statusList', inventoryController.getStatusList);
router.get('/adress', inventoryController.getAddressByCP);

router.get('/:id', authorize(), inventoryController.getInventoryById);
router.put('/contracts/:id/:status', authorize(), inventoryController.setContractStatus);
router.get('/contracts/:idContract', inventoryController.getAllInfoContract);
router.get('/', authorize(), inventoryController.getAllEquipment);
//router.put('/contracts/:id/:status', authorize(), inventoryController.setContractStatus);
//router.get('/contracts', /*authorize(),*/ inventoryController.getContracts);

router.post('/contracts/addMultiple', inventoryController.addMultiple);
router.get('/:id', authorize(), inventoryController.getInventoryById);
router.post(
	'/',
	authorize(Role.Admin),
	inventoryController.createSchema,
	inventoryController.createDevice
);

router.put(
	'/:id',
	authorize(Role.Admin),
	inventoryController.updateSchema,
	inventoryController.updateInventory
);

router.put('/:id/:status', authorize(Role.Admin), inventoryController.inventoryStatus);
router.get('/user/:email', authorize(), inventoryController.getAllInventoryUser);
router.post('/', inventoryController.createEquipment);

router.put(
	'/:id',
	authorize(Role.Admin),
	inventoryController.updateSchema,
	inventoryController.updateInventory
);
router.get('/getClientById/:id', inventoryController.getClientById);
router.delete(
	'/:id/:comments/:user',
	authorize(Role.Admin),
	inventoryController.deleteInventory
);

router.get('/getSlaById/:id', inventoryController.getSlaById)
router.get('/getBrandById/:id', inventoryController.getBrandById)
router.get('/', inventoryController.getAllEquipment);

//New routes for Inventory Dialog (Add Budget)

module.exports = router;
