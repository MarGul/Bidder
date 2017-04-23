import User from '../../includes/models/User';

const auth = {
	state: {
		authenticated: false,
		user: {},
		dropdown: false,
		userServices: [],
		userServicesFetched: false,
		userBids: [],
		userBidsFetched: false
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
		'SET_USER_SERVICES'(state, payload) {
			state.userServices = payload.userServices;
		},
		'SET_USER_SERVICES_FETCHED'(state, payload) {
			state.userServicesFetched = payload.userServicesFetched;
		},
		'SET_USER_BIDS'(state, payload) {
			state.userBids = payload.userBids;
		},
		'SET_USER_BIDS_FETCHED'(state, payload) {
			state.userBidsFetched = payload.userBidsFetched;
		}
	},
	actions: {
		fetchUserServices({commit}) {
			User.setUrl('user/services').get()
				.then(response => {
					commit('SET_USER_SERVICES', {userServices: response.services});
					commit('SET_USER_SERVICES_FETCHED', {userServicesFetched: true});
				});
		},
		fetchUserBids({commit}) {
			User.setUrl('user/bids').get()
				.then(response => {
					commit('SET_USER_BIDS', {userBids: response.bids});
					commit('SET_USER_BIDS_FETCHED', {userBidsFetched: true});
				});
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		authUser: state => state.user,
		authDropdown: state => state.dropdown,
		userServices: state => state.userServices,
		userServicesFetched: state => state.userServicesFetched,
		userBids: state => state.userBids,
		userBidsFetched: state => state.userBidsFetched
	}
}

export default auth;
