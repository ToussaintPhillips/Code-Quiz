document.addEventListener('DOMContentLoaded', displayHighScores);

// Function to display high scores
function displayHighScores() {
  const highScoresOl = document.getElementById('highscores');
  highScoresOl.innerHTML = ''; // Clear previous scores
  
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  if (scores.length > 0) {
    scores.forEach((scoreObj, index) => {
      const liElement = document.createElement('li');
      liElement.textContent = `${index + 1}. ${scoreObj.initials} - ${scoreObj.score}`;
      highScoresOl.appendChild(liElement);
    });
  } else {
    const messageElement = document.createElement('p');
    messageElement.textContent = 'No high scores available.';
    highScoresOl.appendChild(messageElement);
  }
}

// Event listener for clearing high scores
const clearButton = document.getElementById('clear');
if (clearButton) {
  clearButton.addEventListener('click', clearHighScores);
}

// Function to clear high scores
function clearHighScores() {
  localStorage.removeItem('scores');
  displayHighScores(); // Update the displayed scores
}
