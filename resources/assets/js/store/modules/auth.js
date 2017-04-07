const auth = {
	state: {
		authenticated: false,
		user: {}
	},
	mutations: {
		'SET_AUTHENTICATED'(state, payload) {
			state.authenticated = payload.authenticated;
		},
		'SET_USER'(state, payload) {
			state.user = payload.user;
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		authUser: state => state.user
	}
}

export default auth;