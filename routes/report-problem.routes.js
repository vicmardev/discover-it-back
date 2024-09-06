const express = require ('express');
const router = express.Router();
const authorize = require('middleware/authorize');
const Role = require('helpers/role');

const reportProblemController = require('controllers/report-problem.controller');

router.post('/',authorize(), reportProblemController.reportProblemSchema, reportProblemController.reportProblem);
module.exports = router;