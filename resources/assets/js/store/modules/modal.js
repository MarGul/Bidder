const modal = {
	state: {
		open: false,
		component: '',
		data: {},
		size: 'small',
		alert: '',
		message: ''
	},
	mutations: {
		'OPEN_MODAL'(state) {
			state.open = true;
		},
		'CLOSE_MODAL'(state) {
			state.open = false;
		},
		'SET_MODAL_COMPONENT'(state, component) {
			state.component = component;
		},
		'SET_MODAL_SIZE'(state, size) {
			state.size = size;
		},
		'SET_MODAL_DATA'(state, data) {
			state.data = data;
		},
		'SET_MODAL_ALERT'(state, alert) {
			state.alert = alert;
		},
		'SET_MODAL_MESSAGE'(state, message) {
			state.message = message;
		}
	},
	actions: {
		openModal({commit}, {component, size = "small", data = {}, alert = {}}) {
			commit('SET_MODAL_COMPONENT', component);
			commit('SET_MODAL_SIZE', size);
			commit('SET_MODAL_DATA', data);
			if ( alert.type ) commit('SET_MODAL_ALERT', alert.type);
			if ( alert.message ) commit('SET_MODAL_MESSAGE', alert.message);
			commit('OPEN_MODAL');
		},
		closeModal({commit}) {
			commit('CLOSE_MODAL');
			commit('SET_MODAL_COMPONENT', '');
			commit('SET_MODAL_DATA', {});
			commit('SET_MODAL_SIZE', 'small');
			commit('SET_MODAL_ALERT', '');
			commit('SET_MODAL_MESSAGE', '');
		}
	},
	getters: {
		modalOpen: state => state.open,
		modalComponent: state => state.component,
		modalData: state => state.data,
		modalSize: state => state.size,
		modalAlert: state => state.alert,
		modalMessage: state => state.message,
	}
}

export default modal;