const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar(month, year) {
  const calendarHeader = document.querySelector('.calendar-header h1');
  const calendarYear = document.querySelector('.calendar-header p');
  const calendarDays = document.querySelector('.calendar');

  calendarHeader.innerHTML = `${monthNames[month]} <button id="monthDropdownButton">▾</button>`;
  calendarYear.textContent = year;
  calendarDays.innerHTML = '<span class="day-name">Mon</span><span class="day-name">Tue</span><span class="day-name">Wed</span><span class="day-name">Thu</span><span class="day-name">Fri</span><span class="day-name">Sat</span><span class="day-name">Sun</span>';

  const firstDay = new Date(year, month).getDay();
  const numDays = daysInMonth(month, year);

  // Fill in the previous month's days
  for (let i = 0; i < (firstDay + 6) % 7; i++) {
    calendarDays.innerHTML += '<div class="day day--disabled"></div>';
  }

  // Fill in the current month's days
  for (let i = 1; i <= numDays; i++) {
    calendarDays.innerHTML += `<div class="day">${i}</div>`;
  }
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

function selectMonth(monthIndex) {
  currentMonth = monthIndex;
  renderCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', function () {
  renderCalendar(currentMonth, currentYear);

  const calendarHeader = document.querySelector('.calendar-header');

  // Ajouter les boutons "Previous" et "Next"
  const monthChangeButtons = document.createElement('div');
  monthChangeButtons.innerHTML = `
    <button id="prevMonth">Previous</button>
    <button id="nextMonth">Next</button>
  `;
  calendarHeader.appendChild(monthChangeButtons);

  // Écouter le clic sur les boutons "Previous" et "Next"
  document.getElementById('prevMonth').addEventListener('click', function () {
    changeMonth(-1);
  });

  document.getElementById('nextMonth').addEventListener('click', function () {
    changeMonth(1);
  });

  // Écouter le clic sur le bouton de dropdown du mois
  calendarHeader.addEventListener('click', function (e) {
    if (e.target.id === 'monthDropdownButton') {
      const monthDropdown = document.createElement('select');
      monthDropdown.id = 'monthDropdown';

      monthNames.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        if (index === currentMonth) {
          option.selected = true;
        }
        monthDropdown.appendChild(option);
      });

      // Remplacer le contenu du header avec le dropdown
      calendarHeader.innerHTML = '';
      calendarHeader.appendChild(monthDropdown);
      calendarHeader.appendChild(monthChangeButtons);

      // Écouter le changement dans le dropdown
      monthDropdown.addEventListener('change', function () {
        selectMonth(parseInt(this.value));
        calendarHeader.innerHTML = `${monthNames[currentMonth]} <button id="monthDropdownButton">▾</button>`;
        calendarHeader.appendChild(monthChangeButtons);
      });
    }
  });
});
