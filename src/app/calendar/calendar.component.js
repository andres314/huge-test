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

	// Getter for the selected date
	get selectedDate () {
		return new Date(this.selectedYear, this.selectedMonth, this.selectedDay)
	}

	// Getter for the input date(if there is one)
	get getInputDate () {
		let inputDate = sessionStorage.getItem('appointment-date');
		inputDate = (inputDate)?inputDate:'';
		sessionStorage.removeItem('appointment-date');
		return inputDate;
	}

	// Render the view
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
			closed: this.hasAttribute('closed'),
			filter: this.getAttribute('filter')
		})

		this.element.innerHTML = `
			<style>${css}${globalCss}</style>
			${innerHTML}
		`;

		this.calendar = this.element.querySelector('.ui-calendar');

		this.addEventListeners();
	}

	// Add events listeners
	addEventListeners () {
		this.element.querySelectorAll('.day').forEach(element => element.addEventListener('click', () => this.selectDate(element.textContent)));
		this.element.querySelector('#next-month').addEventListener('click', () => this.nextMonth());
		this.element.querySelector('#prev-month').addEventListener('click', () => this.prevMonth());
		this.element.querySelector('#date').addEventListener('click', () => this.togglecalendar());
		this.element.querySelector('#btn-close').addEventListener('click', () => this.close());
	}

	// Move to next month
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

	// Move to previus month
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

	// Open the calendar
	open () {
		this.removeAttribute('closed');
	}

	// Close the calendar
	close () {
		this.setAttribute('closed', true);
	}

	// Toggle the calendar
	togglecalendar () {
		const isClosed = this.hasAttribute('closed');
		if (isClosed) {
			this.open();
		} else {
			this.close();
		}
		this.dispatchEvent(new CustomEvent('toggle-input'));
	}

	// Set initials vars
	setInitialDate () {
		const date = new Date(this.getAttribute('date'));
		this.selectedYear = date.getFullYear();
		this.selectedMonth = date.getMonth();
		this.selectedDay = date.getDate();
		this.selectDateOnCalendar = this.selectedDate;
		this.inputDate = this.getInputDate;
	}

	// Update internal data, emit custom event on date change and close the calendar
	selectDate (day) {
		this.selectedDay = parseInt(day);
		this.selectDateOnCalendar = this.selectedDate;
		this.inputDate = this.selectedDate.toLocaleDateString();
		this.dispatchEvent(new CustomEvent('update-date', { detail: this.inputDate }));
		this.close();
	}
}
