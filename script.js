// script.js

let selectedTheme = 'theme1';

function changeTheme(theme) {
  document.body.className = theme;
  selectedTheme = theme;
}

function addEvent() {
  const eventName = document.getElementById('event-name').value;
  const startDate = new Date(document.getElementById('start-date').value);
  const endDate = new Date(document.getElementById('end-date').value);
  const timeZone = document.getElementById('time-zone').value;

  const eventListed = document.getElementById('listed-events');
  const listItem = document.createElement('li');

  // Calculate remaining time
  const now = new Date();
  const remainingTime = endDate - now;
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  listItem.innerHTML = `<strong>${eventName}</strong> (${startDate.toLocaleString()} to ${endDate.toLocaleString()}) - ${timeZone}
                         <button onclick="editEvent(this)">Edit</button>
                         <button onclick="deleteEvent(this)">Delete</button>
                         <div class="countdown">Remaining Time: ${days} days, ${hours} hours, ${minutes} minutes</div>`;
  eventListed.appendChild(listItem);

  // Redirect to Listed Events
  document.getElementById('listed-events-container').scrollIntoView({ behavior: 'smooth' });

  // Clear form fields after adding an event
  document.getElementById('event-form').reset();
}

function editEvent(button) {
  const listItem = button.parentElement;
  const eventName = prompt('Edit Event Name:', listItem.querySelector('strong').innerText);
  if (eventName) {
    listItem.querySelector('strong').innerText = eventName;
  }
}

function deleteEvent(button) {
  const listItem = button.parentElement;
  listItem.remove();
}

// Update countdown every minute
setInterval(updateCountdown, 60000);

function updateCountdown() {
  const countdowns = document.querySelectorAll('.countdown');
  countdowns.forEach((countdown) => {
    const endDate = new Date(countdown.getAttribute('data-end-date'));
    const now = new Date();
    const remainingTime = endDate - now;
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    countdown.innerHTML = `Remaining Time: ${days} days, ${hours} hours, ${minutes} minutes`;
  });
}
