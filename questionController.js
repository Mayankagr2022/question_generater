const questionStore = require('./questionStore');

const generateQuestionPaper = (totalMarks, difficultyDistribution, topicDistribution = null) => {
  const selectedQuestions = [];
  let remainingMarks = totalMarks;

  // Helper function to select questions based on filter
  const selectQuestions = (filter, requiredMarks) => {
    let questions = questionStore.getQuestionsByFilter(filter);
    
    while (requiredMarks > 0 && questions.length > 0) {
      const index = Math.floor(Math.random() * questions.length);
      const question = questions[index];
      if (question.marks <= requiredMarks) {
        selectedQuestions.push(question);
        requiredMarks -= question.marks;
      }
      questions.splice(index, 1);
    }
    return requiredMarks;
  };

  // First, filter by topics if topic distribution is provided
  // if (topicDistribution) {
  //   console.log('topicDistribution',topicDistribution);
  //   for (const [topic, topicPercentage] of Object.entries(topicDistribution)) {
  //     const topicMarks = Math.floor(totalMarks * topicPercentage);
  //     for (const [difficulty, difficultyPercentage] of Object.entries(difficultyDistribution)) {
  //       const requiredMarks = Math.floor(topicMarks * difficultyPercentage);
  //       remainingMarks = selectQuestions({ topic, difficulty }, requiredMarks);
  //     }
  //   }
  // } else {
  //   // If no topic distribution, select questions based on difficulty distribution only
  //   for (const [difficulty, percentage] of Object.entries(difficultyDistribution)) {
  //     const requiredMarks = Math.floor(totalMarks * percentage);
  //     remainingMarks = selectQuestions({ difficulty }, requiredMarks);
  //   }
  // }

  if (topicDistribution) {
    console.log('topicDistribution',topicDistribution);
    for (const [topic, topicPercentage] of Object.entries(topicDistribution)) {
      const topicMarks = Math.floor(totalMarks * topicPercentage);
      let topicRemainingMarks = topicMarks;

      for (const [difficulty, difficultyPercentage] of Object.entries(difficultyDistribution)) {
        const requiredMarks = Math.floor(topicMarks * difficultyPercentage);
        topicRemainingMarks = selectQuestions({ topic, difficulty }, requiredMarks);
      }

      remainingMarks -= (topicMarks - topicRemainingMarks);
    }
  } else {
    for (const [difficulty, percentage] of Object.entries(difficultyDistribution)) {
      const requiredMarks = Math.floor(totalMarks * percentage);
      remainingMarks = selectQuestions({ difficulty }, requiredMarks);
    }
  }

  // If there are still remaining marks, fill with random questions
  if (remainingMarks > 0) {
    selectQuestions({}, remainingMarks);
  }

  return selectedQuestions;
};

module.exports = {
  generateQuestionPaper,
};
