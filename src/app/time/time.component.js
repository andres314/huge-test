import tpl from './time.template';
import css from './time.css';
import globalCss from '../../styles/global.css';

export class TimeComponent extends HTMLElement {
	static get selector () { return 'appointment-time' }

	connectedCallback () {
		this.element = this.attachShadow({ mode: 'open' });
		this.times = this.getTimes();
		this.setInitialTime();
		// Render the view
		this.render();
	}

	// Get the time if there is one or set the default
	setInitialTime (){
		let initialTime = sessionStorage.getItem('appointment-time');
		initialTime = (initialTime)?initialTime:'12:00 PM';
		sessionStorage.removeItem('appointment-time');
		this.selected = initialTime;
		this.selectTime(initialTime);
	}

	// Get time frame
	getTimes () {
		let timeToString = function(time) {
			let min = time % 60;
			min = (min < 10)?'0'+min:min;
			if (time < 12 * 60) {
				let hour = (time - time % 60) / 60,
					timeInt = hour + '.' + min;

				if(timeInt > currentHour){
					return hour + ':' + min + ' AM';
				}else{
					return 0;
				}
			}
			let hour = (time - time % 60 - 12*60) / 60,
				timeInt = hour+'.'+min,
				tmpCurrentHour = currentHour - 12;

			hour = (hour==0)?'12':hour;
			if(timeInt > tmpCurrentHour){
				return hour + ':' + min + ' PM';
			}else{
				return 0;
			}
		};

		// Get current selected day(by default today)
		let currentDate = this.getAttribute('date').split('/');
		// Proceed depending on the format
		if(currentDate.length > 1){
			let today = new Date();
			const isToday = currentDate[1] == today.getDate() && Number(currentDate[0]) - 1 == today.getMonth() && currentDate[2] == today.getFullYear();
			currentDate = (isToday)?today:new Date(Number(currentDate[2]), Number(currentDate[0]) - 1, Number(currentDate[1]));
		}else{
			currentDate = new Date(currentDate[0]);
		}
		let times = [],
			currentHour = currentDate.getHours() + '.' + currentDate.getMinutes(),
			startHour = 0,
			endHour = 24,
			duration = 15 ;
		for (let t = startHour * 60; t < endHour * 60; t += duration) {
			let currentTime = timeToString(t);
			if(currentTime){
				times[times.length] = currentTime;
			}
		}

		return times;
	}

	// Render the view
	render () {
		const innerHTML = tpl({
			times: this.times,
			selected: this.selected
		});

		this.element.innerHTML = `
			<style>${css}${globalCss}</style>
			${innerHTML}
		`;

		this.addEventListeners();
	}

	// Update time frame and render the view again
	rerender () {
		this.times = this.getTimes();
		this.setInitialTime();
		this.render();
	}

	// Add events listeners
	addEventListeners () {
		this.element.querySelector('select').addEventListener('change', ({ target }) => this.selectTime(target.value))
	}

	// Emit custom event on time change
	selectTime (time) {
		this.dispatchEvent(new CustomEvent('update-time', { detail: time }))
	}
}