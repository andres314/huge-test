import { CalendarComponent } from './app/calendar/calendar.component';
import { AppointmentComponent } from './app/appointment/appointment.component';

const components = [
	CalendarComponent,
	AppointmentComponent
];

components.forEach(component => customElements.define(component.selector, component));