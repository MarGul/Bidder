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
	useContract({commit, state}, payload) {
		let project = state.project;
		// Set project to use contract
		project.use_contract = true;
		// Set users that they haven't accepted.
		project.users.forEach(function(user) {
			if ( payload.usersNotAccepted.includes(user.id) ) {
				user.pivot.accepted = false;
			}
		});
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	removeContract({commit, state}, payload) {
		let project = state.project;
		project.use_contract = false;
		// Set the user to not have use_contract anymore and the other users to not have accepted anymore.
		project.users.forEach(function(user) {
			if ( payload.usersNotAccepted.includes(user.id) ) {
				user.pivot.accepted = false;
			}
			if ( user.pivot.use_contract ) {
				user.pivot.use_contract = false;
			}
		});
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	projectContractUpdated({commit, state}, payload) {
		let project = state.project;
		// Remove old contracts
		project.contracts = [];
		// Add the project.
		project.contracts.push(payload.contract);
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	projectDetailsUpdated({commit, state}, payload) {
		let project = state.project;
		project.service_start = payload.project.service_start;
		project.service_end = payload.project.service_end;
		project.service_hours = payload.project.service_hours;
		project.service_price = payload.project.service_price;
		// Set the user that should be marked with not accepted.
		project.users.forEach(user => {
			if ( payload.usersNotAccepted.includes(user.id) ) {
				user.pivot.accepted = false;
			}
		});
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	acceptProject({commit, state}, payload) {
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
		project.users.find(u => u.id === payload.userAcceptedId).pivot.accepted = true;
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	cancelProject({commit, state}, payload) {
		let project = state.project;
		// Cancel the project.
		project.cancelled = true;
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
		// Set the user that cancelled that he has.
		project.users.find(u => u.id === payload.userCancelledId).pivot.cancelled = true;
		commit('SET_USER_PROJECT_DETAILS', project);
	},
	reviewSubmitted({commit, state}, payload) {
		let project = state.project;
		project.users.find(u => u.id === payload.user.id).pivot.review = payload.review.id;
		// Add all of the project history.
		payload.history.forEach(function(history) {
			project.history.unshift(history);
		});
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