export default ({ activeFilter, filters }) => {
		const isActiveFilter = filter => (filter === activeFilter) ? 'checked' : '';
		return `
			<p>Filter calendar by:</p>
			<div class="filter-calendar">
				${filters.map(filter => `
					<label for="${filter.value}">
						<input type="radio" name="calendar-filter" id="${filter.value}" value="${filter.value}" ${isActiveFilter(filter.value)}>
						<span>${filter.label}</span>
					</label>
				`).join('')}
			</div>

		`;
	}