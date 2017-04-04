export default ({ date, closed}) => `
  <div class="appointment-manager">
  	<h2>Please select a date and time for your appointment:</h2>
    <appointment-calendar date="${date}" ${closed ? 'closed' : ''}></appointment-calendar>
    <appointment-time></appointment-time>
  </div>
`
