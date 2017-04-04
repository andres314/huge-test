import { CalendarComponent } from './app/calendar/calendar.component';
import { TimeComponent } from './app/time/time.component';
import { AppointmentComponent } from './app/appointment/appointment.component';

const components = [
	CalendarComponent,
	TimeComponent,
	AppointmentComponent
];

components.forEach(component => customElements.define(component.selector, component));