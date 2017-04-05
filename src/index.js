import { AppointmentComponent } from './app/appointment/appointment.component';
import { CalendarComponent } from './app/calendar/calendar.component';
import { TimeComponent } from './app/time/time.component';
import { FilterComponent } from './app/filter/filter.component';

const components = [
	AppointmentComponent,
	CalendarComponent,
	TimeComponent,
	FilterComponent
];

components.forEach(component => customElements.define(component.selector, component));