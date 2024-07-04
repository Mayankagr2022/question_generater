const express = require('express');
const { generateQuestionPaper } = require('./questionController');
// const { addQuestion } = require('./questionStore');

const app = express();
app.use(express.json());

// app.post('/add-question', (req, res) => {
//   const question = req.body;
//   addQuestion(question);
//   res.send('Question added successfully');
// });

app.post('/generate-question-paper', (req, res) => {
  const { totalMarks, difficultyDistribution, topicDistribution } = req.body;
  const questionPaper = generateQuestionPaper(totalMarks, difficultyDistribution, topicDistribution);
  res.json(questionPaper);
// res.send('Question paper generated successfully');
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
