const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const Role = require('helpers/role');

const reportProblemService = require('services/report-problem.service');

module.exports = {
    reportProblemSchema,
    reportProblem,
}

function reportProblemSchema(req, res, next){
    const schema = Joi.object({
        description: Joi.string().required(),
        url: Joi.string().required(),
        mail: Joi.string().required(),
        //evidence: Joi.string().required()
    });
    validateRequest(req,next,schema)
}

function reportProblem(req, res, next){
    reportProblemService.reportProblem(req.body, req.get('origin'))
    .then(() => res.json({message:'Please check email admin'}))
    .catch(next);
}