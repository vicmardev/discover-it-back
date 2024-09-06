const express = require('express');
const router = express.Router();
const authorize = require('middleware/authorize');


const quizController = require('controllers/quiz.controller');

router.get('/',quizController.getQuiz);
router.post('/', quizController.createQuiz);


module.exports = router;