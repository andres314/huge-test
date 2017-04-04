const range = n => Array.from({ length: n }, (value, key) => key + 1),
      weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      weekdaysNum = [1, 2, 3, 4, 5],
      weekendsNum = [0, 6];

export default ({ selectedYear, selectedMonth, selectedDay, selectedDate, inputDate, emptyDays, closed }) => {
  const isDayLessThanToday = day => new Date(selectedYear, selectedMonth, day + 1).getTime() < new Date().getTime(),
        isLeapYear = () => !!(selectedMonth === 1 && ((selectedYear % 4 === 0) && (selectedYear % 100 !== 0)) || (selectedYear % 400 === 0));

  return `
    <label for="date">
      <span class="sr-only">Choose a date:</span>
      <input id="date" name="date" type="text" readonly value="${inputDate}" placeholder="Choose a date...">
      <img src="assets/calendar.svg" alt="calendar icon">
    </label>
    <div class="ui-calendar" ${closed ? 'hidden' : ''}>
      <div class="calendar-preheader">
        <div class="calendar-preview">${inputDate}</div>
        <button id="btn-close">x</button>
      </div>
      <div class="calendar-header">
        <button type="button" id="prev-month"><</button>
        <h5>${months[selectedMonth]} ${selectedYear}</h5>
        <button type="button" id="next-month">></button>
      </div>
      <ul class="calendar-nav">
        ${weekdays.map(day => `
          <li>${day.slice(0, 2)}</li>
        `).join('')}
      </ul>
      <div class="calendar-days">
      ${emptyDays.map(empty => `
        <span class="day empty-day"></span>
      `).join('')}

      ${range(isLeapYear() ? 29 : daysInMonth[selectedMonth]).map(day => `
        <button class="day ${parseInt(selectedDay) === day && selectedDate.getMonth() === selectedMonth && selectedDate.getFullYear() === selectedYear ? 'selected' : ''}"
          ${isDayLessThanToday(day) ? 'disabled' : ''}>
          ${day}
        </button>
      `).join('')}
      </div>
    </div>
  `
}
