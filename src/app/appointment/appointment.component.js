import tpl from './appointment.template';
import filters from '../filter/filters.json'
import style from './appointment.css';
import globalCss from '../../styles/global.css';

export class AppointmentComponent extends HTMLElement {
	static get selector () { return 'appointment-manager' }

	connectedCallback () {
		this.element = this.attachShadow({ mode: 'open' });
		this.setDefaultValues();
		this.render();
	}

	// Set defaults vars
	setDefaultValues () {
		this.date = new Date();
		this.time = '';
		this.closed = 1;
		this.saveMsg = 0;
		this.filter = filters[0].value;
		this.dateModified = 0;
		this.timeModified = 0;
	}

	// Render the view
	render () {
		const innerHTML = tpl({
			date: this.date,
			time: this.time,
			closed: this.closed,
			saveMsg: this.saveMsg,
      		filter: this.filter
		})

		this.element.innerHTML = `
			<style>${globalCss}${style}</style>
			${innerHTML}
		`;

		this.addEventListeners();
	}

	// Add events listeners
	addEventListeners () {
		this.element.querySelector('appointment-calendar').addEventListener('update-date', ({ detail }) => this.updateDate(detail));
		this.element.querySelector('appointment-time').addEventListener('update-time', ({ detail }) => this.updateTime(detail));
		this.element.querySelector('appointment-filter').addEventListener('active-filter', ({ detail }) => this.updateFilter(detail));
		this.element.querySelector('#save').addEventListener('click', () => this.saveForm());
		this.element.querySelector('#reset').addEventListener('click', () => this.resetForm());
	}

	// Save form data
	saveForm () {
		this.dispatchEvent(new CustomEvent('custom-event'));
		this.saveMsg = 1;
		this.closed = 1;
		// Save the user inputs
		sessionStorage.setItem('appointment-date', this.date);
		sessionStorage.setItem('appointment-time', this.time);
		// Render the view
		this.render();
	}

	// Reset form data
	resetForm () {
		this.saveMsg = 0;
		this.closed = 1;
		// Remove the user inputs
		sessionStorage.removeItem('appointment-date');
		sessionStorage.removeItem('appointment-time');
		this.dateModified = 0;
		this.timeModified = 0;
		this.render();
	}

	// Update date value to the manager
	updateDate (date) {
		this.date = date;
		this.dateModified = 1;
	}

	// Update time value to the manager
	updateTime (time) {
		this.time = time;
		this.timeModified = 1;
	}

	// Update filter value to the manager
	updateFilter (filter) {
		this.filter = filter;
		// Save the user inputs
		if(this.dateModified){
			sessionStorage.setItem('appointment-date', this.date);
		}
		if(this.timeModified){
			sessionStorage.setItem('appointment-time', this.time);
		}
		this.render();
	}

}
