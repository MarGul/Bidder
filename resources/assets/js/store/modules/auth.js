import User from '../../includes/models/User';

const auth = {
	state: {
		authenticated: window.Laravel.authenticated,
		user: window.Laravel.user || {},
		dropdown: false,
		mobileDropdown: false,
		userServices: [],
		userServicesFetched: false,
		userBids: [],
		userBidsFetched: false,
		userProjects: [],
		userProjectsFetched: false
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
		},
		'SET_USER_PROJECTS'(state, payload) {
			state.userProjects = payload.userProjects;
		},
		'SET_USER_PROJECTS_FETCHED'(state, payload) {
			state.userProjectsFetched = payload.userProjectsFetched;
		}
	},
	actions: {
		logout({commit}) {
			commit('SET_DROPDOWN', {dropdown: false});
			commit('SET_MOBILE_DROPDOWN', {dropdown: false});
			User.new().setUrl('logout').post().then((response) => {
				commit('SET_AUTHENTICATED', {authenticated: false});
				commit('SET_USER', {user: {}});
				commit('SET_USER_SERVICES', {userServices: []});
				commit('SET_USER_SERVICES_FETCHED', {userServicesFetched: false});
				commit('SET_USER_BIDS', {userBids: []});
				commit('SET_USER_BIDS_FETCHED', {userBidsFetched: false});
				// Set the new csrf token
				window.Laravel.csrfToken = response.csrfToken;
				window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken
			}).catch((error) => {
				
			});
		},
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
		},
		fetchUserProjects({commit, state}) {
			User.setUrl(`user/${state.user.id}/projects`).get()
				.then(response => {
					commit('SET_USER_PROJECTS', {userProjects: response.projects});
					commit('SET_USER_PROJECTS_FETCHED', {userProjectsFetched: true});
				});
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		authUser: state => state.user,
		authDropdown: state => state.dropdown,
		mobileAuthDropdown: state => state.mobileDropdown,
		userServices: state => state.userServices,
		userServicesFetched: state => state.userServicesFetched,
		userBids: state => state.userBids,
		userBidsFetched: state => state.userBidsFetched,
		userProjects: state => state.userProjects,
		userProjectsFetched: state => state.userProjectsFetched
	}
}

export default auth;
