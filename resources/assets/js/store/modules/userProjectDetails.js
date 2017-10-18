import { SET_USER_PROJECT_DETAILS_FETCHED, SET_USER_PROJECT_DETAILS } from '../mutation-types';

const state = {
	fetched: false,
	project: {}
}

const mutations = {
	[SET_USER_PROJECT_DETAILS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_PROJECT_DETAILS](state, project) {
		state.project = project;
	}
}

const actions = {
	cancelProject({commit, state, rootState}, payload) {
		let project = state.project;
		project.cancelled = true;
		project.history.unshift(payload.history);
		project.users.find(u => u.id === rootState.auth.user.id).pivot.cancelled = true;
		commit('SET_USER_PROJECT_DETAILS_FETCHED', project);
	}
}

const getters = {
	userProjectDetailsFetched: state => state.fetched,
	userProjectDetails: state => state.project
}

export default {
	state,
	mutations,
	actions,
	getters
}