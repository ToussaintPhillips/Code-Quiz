document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start');
  const questionsDiv = document.getElementById('questions');
  const questionTitle = document.getElementById('question-title');
  const choicesDiv = document.getElementById('choices');
  const endScreen = document.getElementById('end-screen');
  const finalScore = document.getElementById('final-score');
  const initialsInput = document.getElementById('initials');
  const submitButton = document.getElementById('submit');
  const feedbackDiv = document.getElementById('feedback');
  const highScoresDiv = document.getElementById('high-scores-container');
  const timeSpan = document.getElementById('time');

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;

  const correctSound = new Audio('assets/sfx/correct.wav'); 
  const wrongSound = new Audio('assets/sfx/incorrect.wav'); 

  startButton.addEventListener('click', startQuiz);

  function startQuiz() {
    startButton.style.display = 'none';
    questionsDiv.classList.remove('hide');
    displayQuestion();
    startTimer();
  }

  function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      questionTitle.textContent = currentQuestion.question;
      choicesDiv.innerHTML = '';
      currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', checkAnswer);
        choicesDiv.appendChild(button);
      });
    } else {
      endQuiz();
    }
  }

  function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
      score += 10;
      feedbackDiv.textContent = 'Correct!';
      correctSound.play();
    } else {
      timeLeft -= 10;
      feedbackDiv.textContent = 'Wrong!';
      wrongSound.play();
    }

    currentQuestionIndex++;
    displayQuestion();
  }

  function startTimer() {
    const timerInterval = setInterval(() => {
      timeLeft--;
      timeSpan.textContent = timeLeft;
      if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    questionsDiv.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.textContent = score;
  }

  submitButton.addEventListener('click', () => {
    const initials = initialsInput.value.trim();
    if (initials) {
      let scores = JSON.parse(localStorage.getItem('scores')) || [];
      scores.push({ initials, score });
      scores.sort((a, b) => b.score - a.score);
      scores = scores.slice(0, 5);
      localStorage.setItem('scores', JSON.stringify(scores));
      feedbackDiv.textContent = 'Score saved!';
      displayHighScores();
    } else {
      feedbackDiv.textContent = 'Please enter initials!';
    }
  });

  function displayHighScores() {
    highScoresDiv.innerHTML = ''; // Clear previous scores
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.forEach((scoreObj, index) => {
      const scoreElement = document.createElement('div');
      scoreElement.textContent = `${index + 1}. ${scoreObj.initials} - ${scoreObj.score}`;
      highScoresDiv.appendChild(scoreElement);
    });
  }
});

