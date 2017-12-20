import { 
	SET_SERVICE_DETAILS_FETCHED,
	SET_SERVICE_DETAILS
} from '../mutation-types';

const state = {
	fetched: false,
	service: {}
}

const mutations = {
	[SET_SERVICE_DETAILS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_SERVICE_DETAILS](state, service) {
		state.service = service;
	}
}

const actions = {
	addComment({commit, state}, payload) {
		let service = state.service;
		service.comments.unshift(payload.comment);
		commit('SET_SERVICE_DETAILS', service);
	},
	addBid({commit, state}, payload) {
		let service = state.service;
		service.bids.unshift(payload.bid);
		commit('SET_SERVICE_DETAILS', service);
	}
}

const getters = {
	serviceFetched: state => state.fetched,
	service: state => state.service
}

export default {
	state,
	mutations,
	actions,
	getters
}