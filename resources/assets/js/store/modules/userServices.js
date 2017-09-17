import { SET_USER_SERVICES_FETCHED, SET_USER_SERVICES } from '../mutation-types';

const state = {
	fetched: false,
	services: []
}

const mutations = {
	[SET_USER_SERVICES_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_SERVICES](state, services) {
		state.services = services;
	}
}

const actions = {
	
}

const getters = {
	userServicesFetched: state => state.fetched,
	userServices: state => state.services
}

export default {
	state,
	mutations,
	actions,
	getters
}