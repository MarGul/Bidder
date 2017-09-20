const filters = {
	currency(value) {
		return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',')} kr`;
	},
	commaSeparator(value) {
		return value.toString().replace('.', ',');
	},
	date(value) {
		return moment(value).format('D MMM YYYY');
	}
}

export default filters;