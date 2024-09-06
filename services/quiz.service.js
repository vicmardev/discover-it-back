const config = require('config.json');
const db = require('database/db');
const Role = require('helpers/role');
const fs = require('fs');
const sendEmail = require('helpers/send-email');

module.exports = {
	getQuiz,
	createQuiz,
};

async function getQuiz() {
	const quizList = await db.Quiz.find();
	return quizList;
}

async function createQuiz(params) {
	const quiz = new db.Quiz(params);
	await quiz.save();
	//return basicDetails(faq);
}
