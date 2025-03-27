const button = document.getElementById('reaction-btn');
const message = document.getElementById('message');
const result = document.getElementById('result');
const averageTime = document.getElementById('average-time');

let startTime, endTime, isReady = false;
let reactionTimes = [];

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
  button.textContent = 'Ждите...';
  button.classList.remove('ready', 'too-early');
  message.textContent = '';
  result.textContent = '';
  isReady = false;

  const randomTime = getRandomTime(2000, 5000); 

  setTimeout(() => {
    button.textContent = 'Нажмите сейчас!';
    button.classList.add('ready');
    isReady = true;
    startTime = Date.now();
  }, randomTime);
}

button.addEventListener('click', () => {
  if (!isReady) {
    button.classList.add('too-early');
    message.textContent = 'Слишком рано!';
    return;
  }

  endTime = Date.now();
  const reactionTime = endTime - startTime;

  reactionTimes.push(reactionTime);

  result.textContent = `Ваше время реакции: ${reactionTime} мс`;
  const average = reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length;
  averageTime.textContent = `Среднее время: ${Math.round(average)} мс`;

  setTimeout(startGame, 1000);
});

button.addEventListener('click', startGame);
