const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');

const contractController = require('controllers/contract.controller');

router.post('/', contractController.createContract);
router.post('/response', contractController.postResponse);
router.post('/postContractZip', contractController.saveContractZip)
router.get(
	'/contractsdatacenters',
	authorize(),
	contractController.ContractsWithDatacenters
);

router.get('/countries/', authorize(), contractController.getAllCountries);

router.get(
	'/cities/:CountryCode',
	authorize(),
	contractController.getAllCitiesForCountry
);

router.put(
	'/datacenter/update/:idDataCenter',
	authorize(),
	contractController.updateDataCenter
);

router.get('/sla', authorize(), contractController.getAllSLAs);

router.get(
	'/datacenter/:idDataCenter/equipments',
	authorize(),
	contractController.getEquipmentOfDataCenter
);
router.get('/getAllContractTime', contractController.getAllContracTime);

router.put(
	'/datacenterequipment/:idDataCenterEquipment',
	authorize(),
	contractController.updateDataCenterEquipment
);

//router.get('/location/bystate', contractController.getDatacentersByState);

router.post('/import', authorize(), contractController.importExcelFile);

router.put('/editalias/:contractId', authorize(), contractController.editAlias);

router.get('/:id', contractController.getContractById);
router.put('/:id', contractController.updateContract);
router.get('/getContractTimeById/:id', contractController.getContractTimeById);
router.get('/getCompleteOrder/:NumOrder', contractController.getCompleteOrder);
router.get('/', contractController.getAllContracts);
module.exports = router;
