class BootstrapBreakpoints {

	constructor() {
		
	}

	is(breakpoint) {
		return $('#detect-breakpoints .device-' + breakpoint).is(':visible');
	}

}

export default BootstrapBreakpoints;