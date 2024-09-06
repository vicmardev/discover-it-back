const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');
const orderController = require('controllers/order-purchase.controller');

router.post('/', authorize(), orderController.createOrder);
router.get('/', authorize(), orderController.getAllOrders);
router.get('/getAllOrder', orderController.getAllOrders);
router.get('/getBrands', authorize(), orderController.getBrands);
router.get('/getTypeParts', authorize(), orderController.getTypeParts);
router.put('/updateOrder', authorize(), orderController.updateOrder);
router.get('/getHistory/:numOrder', authorize(), orderController.getHistory);
router.put('/editOrder', authorize(), orderController.editOrder);
router.put('/deleteOrder', authorize(), orderController.deleteOrder);

module.exports = router;
