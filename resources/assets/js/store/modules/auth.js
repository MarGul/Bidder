const auth = {
	state: {
		authenticated: false,
		token: null,
		expiration: null,
		user: {}
	},
	mutations: {
		'SET_AUTHENTICATED'(state, value) {
			state.authenticated = value;
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
		authenticate({commit}, auth) {
			// Set the state.
			commit('SET_TOKEN', auth.access_token);
			commit('SET_EXPIRATION', Date.now() + auth.expires_in);
			commit('SET_AUTHENTICATED', true);
			// Set the localStorage
			window.localStorage.setItem('token', auth.access_token);
			window.localStorage.setItem('expires', Date.now() + auth.expires_in);
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		getToken: state => state.token,
		getExpiration: state => state.expiration,
		getUser: state => state.user
	}
}

export default auth;