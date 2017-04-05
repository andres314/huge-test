import template from './filter.template'
import style from './filter.css'
import filters from './filters.json'

export class FilterComponent extends HTMLElement {
	static get selector () { return 'appointment-filter' }

	connectedCallback () {
		this.element = this.attachShadow({ mode: 'open' });
		this.render();
	}

	// Render the view
	render () {
		const innerHTML = template({
			activeFilter: this.getAttribute('filter'),
			filters
		});

		this.element.innerHTML = `
			<style>${style}</style>
			${innerHTML}
		`;

		this.addEventListeners()
	}

	// Add events listeners
	addEventListeners () {
		this.element.querySelectorAll('input').forEach(element => element.addEventListener('change', () => this.selectFilter(element.value)));
	}

	// Emit custom event on filter change
	selectFilter (filter) {
		this.dispatchEvent(new CustomEvent('active-filter', { detail: filter }));
	}
}