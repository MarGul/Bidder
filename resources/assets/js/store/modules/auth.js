import { SET_AUTHENTICATED, SET_AUTHENTICATED_USER, SET_AUTHENTICATED_INTENDED, SET_DROPDOWN } from '../mutation-types';

const state = {
	authenticated: window.auth.authenticated || false,
	user: window.auth.user || {},
	intended: null,
	dropdown: false
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
	},
	[SET_DROPDOWN](state, dropdown) {
		state.dropdown = dropdown;
	}
}

const actions = {
	clearState({commit}) {
		commit('SET_AUTHENTICATED', false);
		commit('SET_AUTHENTICATED_USER', {});
		commit('SET_AUTHENTICATED_INTENDED', null);
		commit('SET_DROPDOWN', false);
	}
}

const getters = {
	isAuthenticated: state => state.authenticated,
	authUser: state => state.user,
	authIntended: state => state.intended,
	authDropdown: state => state.dropdown
}

export default {
	state,
	mutations,
	actions,
	getters
}


/*
const auth = {
	state: {
		authenticated: window.Laravel.authenticated,
		user: window.Laravel.user || {},
		intended: null,
		dropdown: false,
		mobileDropdown: false
	},
	mutations: {
		'SET_AUTHENTICATED'(state, payload) {
			state.authenticated = payload.authenticated;
		},
		'SET_USER'(state, payload) {
			state.user = payload.user;
		},
		'SET_INTENDED'(state, payload) {
			state.intended = payload.intended;
		},
		'SET_DROPDOWN'(state, payload) {
			state.dropdown = payload.dropdown;
		},
		'SET_MOBILE_DROPDOWN'(state, payload) {
			state.mobileDropdown = payload.mobileDropdown;
		}
	},
	actions: {
		logout({commit, dispatch}) {
			commit('SET_DROPDOWN', {dropdown: false});
			commit('SET_MOBILE_DROPDOWN', {dropdown: false});
			commit('SET_AUTHENTICATED', {authenticated: false});
			commit('SET_USER', {user: {}});
			// Clear user cached state
			dispatch('clearUserState');
			new Model().new().setUrl('logout').post().then((response) => {
				// Set the new csrf token
				window.Laravel.csrfToken = response.csrfToken;
				window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken
			}).catch((error) => {
				
			});
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		authUser: state => state.user,
		authIntended: state => state.intended,
		authDropdown: state => state.dropdown,
		mobileAuthDropdown: state => state.mobileDropdown
	}
}

export default auth;
*/