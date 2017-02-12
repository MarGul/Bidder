class BootstrapBreakpoints {

	constructor() {
		let bb = this;
		this._onLoad(bb);

		$(window).resize(function() {
			bb._onLoad(bb);
		});
	}

	_onLoad(bb) {
		bb.current = bb._getCurrentBreakpoint();
		bb.mobile = bb.isMobile();
	}

	_getCurrentBreakpoint() {
		return $('#detect-breakpoints').find('span:visible:first')[0].className.split(/\s+/)[0].replace('device-', '');
	}

	is(breakpoint) {
		return this.current == breakpoint;
	}

	isMobile() {
		return this.current == 'xs';
	}

}

export default BootstrapBreakpoints;