export default ({ date, closed}) => `
  <div class="appointment-manager">
    <appointment-calendar date="${date}" ${closed ? 'closed' : ''}></appointment-calendar>
  </div>
`
