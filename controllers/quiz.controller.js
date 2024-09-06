const Joi = require('joi');
const validateRequest =  require('middleware/validate-request');
const Role = require('helpers/role');


const quizServices = require('services/quiz.service');

module.exports = {
    getQuiz, 
    createQuiz,
};


function getQuiz (req, res, next){
    quizServices.getQuiz()
    .then(quizList => res.json(quizList))
    .catch(next);
}

function createQuiz (req, res, next){
    quizServices.createQuiz(req.body)
    .then( quiz => res.json(quiz))
    .catch(next);
}
