Start with npm start
PORT = 5500 
On Postman request the post API http://localhost:5500/generate-question-paper
payload :
{
  "totalMarks": 100,
  "difficultyDistribution": {
    "Easy": 0.2,
    "Medium": 0.5,
    "Hard": 0.3
  },
  "topicDistribution": {
    "Waves": 0.2,
    "Mechanics": 0.3,
    "Electricity": 0.1,
    "Botany": 0.2,
    "Genetics": 0.2
  }
}
