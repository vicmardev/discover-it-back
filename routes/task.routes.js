const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');

const taskController = require('controllers/task.controller');
//TODO: add auth
router.get('/', taskController.getAllTask);
router.post('/', taskController.createSchema, taskController.createTask);
router.put('/:id', taskController.updateSchema, taskController.updateTask);
router.get('/:id', taskController.getTaskById);

module.exports = router;
