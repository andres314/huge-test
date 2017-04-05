export default ({date, time, closed, saveMsg, filter}) => `
	<form id="test">
		<div class="appointment-manager">
			<h2>Please select a date and time for your appointment:</h2>
			<appointment-filter filter="${filter}"></appointment-filter>
			<div class="form-pickers">
				<appointment-calendar filter="${filter}" date="${date}" ${closed ? 'closed' : ''}></appointment-calendar>
				<appointment-time></appointment-time>
			</div>
			<div class="form-actions">
				<button id="save" type="button">Save</button>
    			<button id="reset" type="button">Cancel</button>
			</div>
			<p class="notifications" ${saveMsg ? '' : `style="display:none"`}>
				Good! Your appointment is set for ${date} at ${time}. Thanks!
			</p>
		</div>
	</form>`;
