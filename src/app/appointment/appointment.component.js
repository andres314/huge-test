import tpl from './appointment.template';
import style from './appointment.css';
import globalCss from '../../styles/global.css';

export class AppointmentComponent extends HTMLElement {
  static get selector () { return 'appointment-manager' }

  connectedCallback () {
    this.element = this.attachShadow({ mode: 'open' });
    this.setDefaultValues();
    this.render();
  }

  setDefaultValues () {
    this.date = new Date();
    this.time = '';
    this.closed = 1;
    this.saveMsg = 0;
  }

  render () {
    const innerHTML = tpl({
      date: this.date,
      time: this.time,
      closed: this.closed,
      saveMsg: this.saveMsg
    })

    this.element.innerHTML = `
      <style>${globalCss}${style}</style>
      ${innerHTML}
    `;

    this.addEventListeners();
  }

  addEventListeners () {
    this.element.querySelector('appointment-calendar').addEventListener('update-date', ({ detail }) => this.updateDate(detail));
    this.element.querySelector('appointment-time').addEventListener('update-time', ({ detail }) => this.updateTime(detail));
    this.element.querySelector('#save').addEventListener('click', () => this.saveForm());
    this.element.querySelector('#reset').addEventListener('click', () => this.resetForm());
  }

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

  resetForm () {
    this.saveMsg = 0;
    this.closed = 1;
    this.render();
  }

  updateDate (date) {
    this.date = date;
  }

  updateTime (time) {
    this.time = time;
  }

}
