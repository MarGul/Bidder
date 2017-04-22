import User from '../../includes/models/User';

const auth = {
	state: {
		authenticated: false,
		user: {},
		userServices: []
	},
	mutations: {
		'SET_AUTHENTICATED'(state, payload) {
			state.authenticated = payload.authenticated;
		},
		'SET_USER'(state, payload) {
			state.user = payload.user;
		},
		'SET_USER_SERVICES'(state, payload) {
			state.userServices = payload.userServices;
		}
	},
	actions: {
		fetchUserServices({commit}) {
			User.setUrl('user/services').get()
				.then(response => {
					commit('SET_USER_SERVICES', {userServices: response.services});
				});
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		authUser: state => state.user,
		userServices: state => state.userServices
	}
}

export default auth;
