const fs = require('fs');
const path = require('path');

// Load questions from the JSON file
const loadQuestions = () => {
  const data = fs.readFileSync(path.join(__dirname, 'question.json'));
  return JSON.parse(data);
}

const questions = loadQuestions();

// const addQuestion = (question) => {
//   questions.push(question);
//   // Save the updated questions list back to the JSON file
//   fs.writeFileSync(path.join(__dirname, 'questions.json'), JSON.stringify(questions, null, 2));
// };

const getQuestionsByFilter = (filter) => {
    console.log('filter',filter);
    return questions.filter((question) => {
      return Object.entries(filter).every(([key, value]) => question[key] === value);
    });
  };

module.exports = {
//   addQuestion,
  getQuestionsByFilter,
};
