import { SET_USER_PROJECT_DETAILS_FETCHED, SET_USER_PROJECT_DETAILS } from '../mutation-types';

const state = {
	fetched: false,
	project: []
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