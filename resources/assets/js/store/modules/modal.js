const modal = {
	state: {
		open: false,
		component: '',
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
		}
	},
	actions: {
		openModal({commit}, {component, size = "small"}) {
			commit('SET_MODAL_COMPONENT', component);
			commit('SET_MODAL_SIZE', size);
			commit('OPEN_MODAL');
		},
		closeModal({commit}) {
			commit('CLOSE_MODAL');
			commit('SET_MODAL_COMPONENT', '');
		}
	},
	getters: {
		modalOpen: state => state.open,
		modalComponent: state => state.component,
		modalSize: state => state.size
	}
}

export default modal;