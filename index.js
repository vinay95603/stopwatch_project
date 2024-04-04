let display = document.querySelector('.display');
let startBtn = document.querySelector('.start');
let pauseBtn = document.querySelector('.pause');
let resetBtn = document.querySelector('.reset');
let lapBtn = document.querySelector('.lap');
let lapsList = document.querySelector('.laps');

let startTime, elapsedTime, timerInterval, lapCounter = 1;

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
  startTime = Date.now() - (elapsedTime || 0);
  timerInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00.000';
  elapsedTime = 0;
  startTime = null;
  lapCounter = 1;
  lapsList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
}

function recordLap() {
  let lapTime = formatTime(elapsedTime);
  let lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapsList.appendChild(lapItem);
  lapCounter++;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  let milliseconds = time % 1000;
  time = Math.floor(time / 1000);

  let seconds = time % 60;
  time = Math.floor(time / 60);

  let minutes = time % 60;
  let hours = Math.floor(time / 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}