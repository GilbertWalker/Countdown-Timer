// Select the elements that we'll need
const buttons = document.querySelectorAll('.timer__button');
const timeLeftDisplay = document.querySelector('.display__time-left');

let countdown; // We'll use this variable to store the interval ID for the timer

// Add event listeners to the buttons
buttons.forEach(button => button.addEventListener('click', startTimer));

function startTimer() {
  // Get the number of seconds from the data-time attribute of the button that was clicked
  const seconds = parseInt(this.dataset.time);

  // Calculate the end time by adding the number of seconds to the current timestamp
  const endTime = Date.now() + (seconds * 1000);

  // Call the displayTimeLeft function immediately to display the initial time left
  displayTimeLeft(seconds);

  // Call the displayEndTime function to show the end time
  displayEndTime(endTime);

  // Clear any existing interval to make sure we don't have multiple timers running at once
  clearInterval(countdown);

  // Start the timer by updating the time left every second
  countdown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    // If we've reached the end of the timer, stop the countdown
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // Otherwise, display the time left
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  // Convert the total number of seconds to minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  // Display the time left in the <h1> element
  timeLeftDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function displayEndTime(timestamp) {
  // Convert the timestamp to a Date object
  const end = new Date(timestamp);
  // Get the hour and minute components of the end time
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  // Display the end time in the <p> element
  const endTimeDisplay = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes} ${hour > 12 ? 'PM' : 'AM'}`;
  document.querySelector('.display__end-time').textContent = endTimeDisplay;
}
