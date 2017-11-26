import { SET_AUTHENTICATED, SET_AUTHENTICATED_USER, SET_AUTHENTICATED_INTENDED } from '../mutation-types';

const state = {
	authenticated: window.auth.authenticated || false,
	user: window.auth.user || {},
	intended: null
}

const mutations = {
	[SET_AUTHENTICATED](state, authenticated) {
		state.authenticated = authenticated;
	},
	[SET_AUTHENTICATED_USER](state, user) {
		state.user = user;
	},
	[SET_AUTHENTICATED_INTENDED](state, intended) {
		state.intended = intended;
	}
}

const actions = {
	clearAuthState({commit}) {
		commit('SET_AUTHENTICATED', false);
		commit('SET_AUTHENTICATED_USER', {});
		commit('SET_AUTHENTICATED_INTENDED', null);
		window.auth.authenticated = false;
		window.auth.user = {};
	}
}

const getters = {
	isAuthenticated: state => state.authenticated,
	authUser: state => state.user,
	authIntended: state => state.intended
}

export default {
	state,
	mutations,
	actions,
	getters
}