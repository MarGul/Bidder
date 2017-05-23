import Model from '../../includes/Model';

const user = {
	state: {
		services: [],
		servicesFetched: false,
		bids: [],
		bidsFetched: false,
		projects: [],
		projectsFetched: false,
		projectFocus: null
	},
	mutations: {
		'SET_SERVICES'(state, payload) {
			state.services = payload.services;
		},
		'SET_SERVICES_FETCHED'(state, payload) {
			state.servicesFetched = payload.fetched;
		},
		'SET_BIDS'(state, payload) {
			state.bids = payload.bids;
		},
		'SET_BIDS_FETCHED'(state, payload) {
			state.bidsFetched = payload.fetched;
		},
		'SET_PROJECTS'(state, payload) {
			state.projects = payload.projects;
		},
		'SET_PROJECTS_FETCHED'(state, payload) {
			state.projectsFetched = payload.fetched;
		},
		'SET_PROJECT_FOCUS'(state, payload) {
			state.projectFocus = payload.project;
		}
	},
	actions: {
		clearUserState({commit}) {
			commit('SET_SERVICES', {services: []});
			commit('SET_SERVICES_FETCHED', {fetched: false});
			commit('SET_BIDS', {bids: []});
			commit('SET_BIDS_FETCHED', {fetched: false});
			commit('SET_PROJECTS', {projects: []});
			commit('SET_PROJECTS_FETCHED', {fetched: false});
			commit('SET_PROJECT_FOCUS', {project: null});
		},
		fetchUserServices({commit}) {
			new Model('user/services').get()
				.then(response => {
					commit('SET_SERVICES', {services: response.services});
					commit('SET_SERVICES_FETCHED', {fetched: true});
				});
		},
		fetchUserBids({commit}) {
			new Model('user/bids').get()
				.then(response => {
					commit('SET_BIDS', {bids: response.bids});
					commit('SET_BIDS_FETCHED', {fetched: true});
				});
		},
		fetchUserProjects({commit, rootState}, payload = {}) {
			new Model('user/{id}/projects').setId(rootState.auth.user.id).get()
				.then(response => {
					commit('SET_PROJECTS', {projects: response.projects});
					commit('SET_PROJECTS_FETCHED', {fetched: true});
					// If we have passed in a focusId then set the project with that Id as focus.
					if ( payload.focusId ) {
						let focus = response.projects.find(project => project.id == payload.focusId);
						commit('SET_PROJECT_FOCUS', {project: focus});
					}
				});
		}
	},
	getters: {
		userServices: state => state.services,
		userServicesFetched: state => state.servicesFetched,
		userBids: state => state.bids,
		userBidsFetched: state => state.bidsFetched,
		userProjects: state => state.projects,
		userProjectsFetched: state => state.projectsFetched,
		userProjectFocus: state => state.projectFocus
	}
}

export default user;
