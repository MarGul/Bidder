const modal = {
	state: {
		open: false,
		component: '',
		data: {},
		size: 'small'
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
		}
	},
	actions: {
		openModal({commit}, {component, size = "small", data = {}}) {
			commit('SET_MODAL_COMPONENT', component);
			commit('SET_MODAL_SIZE', size);
			commit('SET_MODAL_DATA', data);
			commit('OPEN_MODAL');
		},
		closeModal({commit}) {
			commit('CLOSE_MODAL');
			commit('SET_MODAL_COMPONENT', '');
			commit('SET_MODAL_DATA', {});
			commit('SET_MODAL_SIZE', 'small');
		}
	},
	getters: {
		modalOpen: state => state.open,
		modalComponent: state => state.component,
		modalData: state => state.data,
		modalSize: state => state.size
	}
}

export default modal;