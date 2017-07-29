class BootstrapBreakpoints {

	constructor() {
		this._update();

		window.onresize = function() {
			this._update();
		}.bind(this);
	}

	_update(bb) {
		this.current = this._getCurrentBreakpoint();
		this.mobile = this.isMobile();
		this.small = this.isSmallDevices();
	}

	_getCurrentBreakpoint() {
		let breakpoints = document.querySelectorAll('#detect-breakpoints span');
		for ( let i = 0; i < breakpoints.length; i++) {
			if ( breakpoints[i].offsetParent !== null) {
				return breakpoints[i].classList[0].replace('device-', '');
			}
		}
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