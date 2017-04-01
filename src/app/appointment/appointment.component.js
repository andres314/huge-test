import template from './appointment.template';
import style from './appointment.css';

export class AppointmentComponent extends HTMLElement {
  static get selector () { return 'appointment-manager' }

  connectedCallback () {
    this.element = this.attachShadow({ mode: 'open' });
    this.setDefaultValues();
    this.render();
  }

  setDefaultValues () {
    this.date = new Date();
    this.closed = true;
  }

  render () {
    const innerHTML = template({
      date: this.date,
      closed: this.closed
    })

    this.element.innerHTML = `
      <style>${style}</style>
      ${innerHTML}
    `

    this.addEventListeners();
  }

  addEventListeners () {
    this.element.querySelector('appointment-calendar').addEventListener('selected-date', ({ detail }) => this.updateDate(detail))
  }

  updateDate (date) {
    this.date = date;
  }
}
