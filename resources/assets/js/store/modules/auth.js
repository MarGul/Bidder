import User from '../../includes/models/User';

const auth = {
	state: {
		authenticated: window.Laravel.authenticated,
		user: window.Laravel.user || {},
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
			User.new().setUrl('logout').post().then((response) => {
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
		authDropdown: state => state.dropdown,
		mobileAuthDropdown: state => state.mobileDropdown
	}
}

export default auth;
