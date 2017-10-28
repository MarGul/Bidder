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
		// Cancel the project.
		project.cancelled = true;
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
		// Set the user that cancelled that he has.
		project.users.find(u => u.id === rootState.auth.user.id).pivot.cancelled = true;
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	acceptProject({commit, state, rootState}, payload) {
		let project = state.project;
		// Start the project if we should
		if ( payload.started ) {
			project.started = true;
		}
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
		// Set the user that accepted that he has.
		project.users.find(u => u.id === rootState.auth.user.id).pivot.accepted = true;
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	reviewSubmitted({commit, state}, payload) {
		let project = state.project;
		project.users.find(u => u.id === payload.user.id).pivot.review = payload.review.id;
		commit('SET_USER_PROJECT_DETAILS', project);
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