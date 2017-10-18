const filters = {
	currency(value) {
		return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',')} kr`;
	},
	commaSeparator(value) {
		return value.toString().replace('.', ',');
	},
	date(value) {
		return moment(value).format('D MMM YYYY');
	},
	time(value) {
		return moment(value).format('D MMM YYYY HH:mm');
	},
	isNumber(event) {
		let code = event.keyCode || event.which;
		if ( code >= 48 && code <= 57 ) {
			return true;
		} else {
			event.preventDefault();
		}
	}
}

export default filters;