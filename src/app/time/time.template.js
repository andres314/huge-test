export default ({ times, selected }) => {
	return `
		<label for="time">
			<span class="sr-only">Choose a time</span>
			<select id="time" class="ui-time">
				${times.map(time => `
					<option ${(time==selected) ? 'selected': ''} value="${time}">${time}</option>
				`).join('')}
			</select>
			<img id="clock" src="assets/clock.svg" alt="Clock icon">
		</label>
	`;
}
