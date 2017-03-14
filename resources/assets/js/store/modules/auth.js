const auth = {
	state: {
		authenticated: false,
		user: {}
	},
	mutations: {
		'SET_AUTHENTICATED'(state, value) {
			state.authenticated = value;
		},
		'SET_USER'(state, user) {
			state.user = user;
		}
	},
	actions: {
		getAuthUser({commit}) {
			axios.get('auth/user')
				.then((response) => {
					commit('SET_AUTHENTICATED', true);
					commit('SET_USER', response.data.user);
				})
				.catch((error) => {
					commit('SET_AUTHENTICATED', false);
				});
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		authUser: state => state.user
	}
}

export default auth;