class BootstrapBreakpoints {

	constructor() {
		this._update();

		$(window).resize(function() {
			this._update();
		}.bind(this));
	}

	_update(bb) {
		this.current = this._getCurrentBreakpoint();
		this.mobile = this.isMobile();
		this.small = this.isSmallDevices();
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

	isSmallDevices() {
		return this.current == 'xs' || this.current == 'sm';
	}

}

export default BootstrapBreakpoints;