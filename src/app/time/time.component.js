import tpl from './time.template';
import css from './time.css';
import globalCss from '../../styles/global.css';

export class TimeComponent extends HTMLElement {
  static get selector () { return 'appointment-time' }

  constructor () {
    super();
  }

  connectedCallback () {
    this.element = this.attachShadow({ mode: 'open' });
    this.times = this.getTimes();
    this.setInitialTime();
    // Render the view
    this.render();
  }

  setInitialTime (){
    let initialTime = sessionStorage.getItem('appointment-time');
    initialTime = (initialTime)?initialTime:'12:00 PM';
    sessionStorage.removeItem('appointment-time');
    this.selected = initialTime;
    this.selectTime(initialTime);
  }

  getTimes () {
    let timeToString = function(time) {
      let min = time % 60;
      min = (min < 10)?'0'+min:min;
      if (time < 12 * 60) {
        return (time - time % 60) / 60 + ':' + min + ' AM';
      }
      let hour = (time - time % 60 - 12*60) / 60;
      hour = (hour==0)?'12':hour;
      return hour + ':' + min + ' PM';
    };

    let times = [],
      startHour = 0,
      endHour = 24,
      duration = 15 ;
    for (let t = startHour * 60; t < endHour * 60; t += duration) {
      times[times.length] = timeToString(t);
    }

    return times;
  }

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

  addEventListeners () {
    this.element.querySelector('select').addEventListener('change', ({ target }) => this.selectTime(target.value))
  }

  selectTime (time) {
    this.dispatchEvent(new CustomEvent('update-time', { detail: time }))
  }
}