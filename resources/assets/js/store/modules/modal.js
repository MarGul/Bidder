import { 
	SET_MODAL_OPEN_STATE, 
	SET_MODAL_COMPONENT, 
	SET_MODAL_SIZE, 
	SET_MODAL_DATA 
} from '../mutation-types';

const state = {
	open: false,
	component: '',
	size: 'size-small',
	data: {}
}

const mutations = {
	[SET_MODAL_OPEN_STATE](state, open) {
		state.open = open;
	},
	[SET_MODAL_COMPONENT](state, component) {
		state.component = component;
	},
	[SET_MODAL_SIZE](state, size) {
		state.size = size;
	},
	[SET_MODAL_DATA](state, data) {
		state.data = data;
	}
}

const actions = {
	openModal({commit}, {component, size = 'size-small', data = {}}) {
		commit('SET_MODAL_OPEN_STATE', true);
		commit('SET_MODAL_COMPONENT', component);
		commit('SET_MODAL_SIZE', size);
		commit('SET_MODAL_DATA', data);
	},
	closeModal({commit}) {
		commit('SET_MODAL_OPEN_STATE', false);
		commit('SET_MODAL_COMPONENT', '');
		commit('SET_MODAL_SIZE', 'size-small');
		commit('SET_MODAL_DATA', {});
	}
}

const getters = {
	modalOpen: state => state.open,
	modalComponent: state => state.component,
	modalData: state => state.data,
	modalSize: state => state.size,
}

export default {
	state,
	mutations,
	actions,
	getters
}