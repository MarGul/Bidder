const modal = {
	state: {
		open: false,
		component: ''
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
		}
	},
	actions: {
		openModal({commit}, {component}) {
			commit('SET_MODAL_COMPONENT', component);
			commit('OPEN_MODAL');
		},
		closeModal({commit}) {
			commit('CLOSE_MODAL');
			commit('SET_MODAL_COMPONENT', '');
		}
	},
	getters: {
		modalOpen: state => state.open,
		modalComponent: state => state.component
	}
}

export default modal;