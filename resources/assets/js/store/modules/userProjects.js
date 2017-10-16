import { SET_USER_PROJECTS_FETCHED, SET_USER_PROJECTS } from '../mutation-types';

const state = {
	fetched: false,
	projects: []
}

const mutations = {
	[SET_USER_PROJECTS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_PROJECTS](state, projects) {
		state.projects = projects;
	}
}

const actions = {
	
}

const getters = {
	userProjectsFetched: state => state.fetched,
	userProjects: state => state.projects
}

export default {
	state,
	mutations,
	actions,
	getters
}