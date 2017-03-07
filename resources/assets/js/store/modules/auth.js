const auth = {
	state: {
		authenticated: false,
		token: null,
		expiration: null,
		user: {}
	},
	mutations: {
		'SET_AUTHENTICATED'(state, value) {
			state.authenticate = value;
		},
		'SET_TOKEN'(state, token) {
			state.token = token;
		},
		'SET_EXPIRATION'(state, expiration) {
			state.expiration = expiration;
		},
		'SET_USER'(state, user) {
			state.user = user;
		}
	},
	actions: {
		initAuth({commit}) {
			// Read from local storage and update the state.
		},
		authenticate({commit}, {access_token, expiration, user}) {
			// Update the local storage and the state.
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		getToken: state => state.token,
		getExpiration: state => state.expiration,
		getName: state => state.name,
		getAvatar: state => state.avatar,
	}
}

export default auth;