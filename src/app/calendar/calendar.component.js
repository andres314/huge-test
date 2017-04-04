import tpl from './calendar.template';
import css from './calendar.css';
import globalCss from '../../styles/global.css';

export class CalendarComponent extends HTMLElement {
  static get selector () { return 'appointment-calendar' }

  connectedCallback () {
    this.element = this.attachShadow({ mode: 'open' });
    this.setInitialDate();
    this.render();
  }

  get selectedDate () {
    return new Date(this.selectedYear, this.selectedMonth, this.selectedDay)
  }

  render () {
    let selectedDateEmpty = new Date(this.selectedYear, this.selectedMonth, 1);
    selectedDateEmpty = selectedDateEmpty.getDay();
    const emptyDays = [];

    for (let i = 0; i < selectedDateEmpty; i++) {
      emptyDays.push(i);
    }

    const innerHTML = tpl({
      selectedYear: this.selectedYear,
      selectedMonth: this.selectedMonth,
      selectedDay: this.selectedDay,
      selectedDate: this.selectDateOnCalendar,
      inputDate: this.inputDate,
      emptyDays,
      closed: this.hasAttribute('closed')
    })

    this.element.innerHTML = `
      <style>${css}${globalCss}</style>
      ${innerHTML}
    `;

    this.calendar = this.element.querySelector('.ui-calendar');

    this.addEventListeners();
  }

  addEventListeners () {
    this.element.querySelectorAll('.day').forEach(element => element.addEventListener('click', () => this.selectDate(element.textContent)));
    this.element.querySelector('#next-month').addEventListener('click', () => this.nextMonth());
    this.element.querySelector('#prev-month').addEventListener('click', () => this.prevMonth());
    this.element.querySelector('#date').addEventListener('click', () => this.togglecalendar());
    this.element.querySelector('#btn-close').addEventListener('click', () => this.close());
  }

  nextMonth () {
    if (this.selectedMonth === 11) {
      this.selectedYear++;
      this.selectedMonth = 0;
    } else {
      this.selectedMonth++;
    }
    this.render();
    this.dispatchEvent(new CustomEvent('next-month'));
  }

  prevMonth () {
    if (this.selectedMonth === 0) {
      this.selectedYear--;
      this.selectedMonth = 11;
    } else {
      this.selectedMonth--;
    }
    this.render();
    this.dispatchEvent(new CustomEvent('prev-month'));
  }

  static get observedAttributes() { return ['closed'] }

  attributeChangedCallback() {
    if (this.element) {
      this.render();
    }
  }

  open () {
    this.removeAttribute('closed');
  }

  close () {
    this.setAttribute('closed', true);
  }

  togglecalendar () {
    const isClosed = this.hasAttribute('closed');
    if (isClosed) {
      this.open();
    } else {
      this.close();
    }
    this.dispatchEvent(new CustomEvent('toggle-input'));
  }

  setInitialDate () {
    const date = new Date(this.getAttribute('date'));
    this.selectedYear = date.getFullYear();
    this.selectedMonth = date.getMonth();
    this.selectedDay = date.getDate();
    this.selectDateOnCalendar = this.selectedDate;
    this.inputDate = '';
  }

  selectDate (day) {
    this.selectedDay = parseInt(day);
    this.selectDateOnCalendar = this.selectedDate;
    this.inputDate = this.selectedDate.toLocaleDateString();
    this.dispatchEvent(new CustomEvent('selected-date', { detail: this.selectDateOnCalendar }));
    this.close();
  }
}
