const buttons = document.querySelectorAll('.timer__button');
const customForm = document.querySelector('#custom');
const timeLeftDisplay = document.querySelector('.display__time-left');
let countdown; // Define countdown variable

buttons.forEach(button => button.addEventListener('click', startTimer));
customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (isNaN(mins)) {
    alert('Please enter a number.');
    return;
  }
  const seconds = mins * 60;
  startTimer(seconds);
  this.reset();
});

function startTimer(seconds) {
  clearInterval(countdown); // Clear any existing timer
  const startTime = Date.now();
  const endTime = startTime + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(endTime);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timeLeftDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  const display = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${hour > 12 ? 'PM' : 'AM'}`;
  document.querySelector('.display__end-time').textContent = display;
}
