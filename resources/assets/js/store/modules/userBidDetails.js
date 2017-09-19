import { SET_USER_BID_DETAILS_FETCHED, SET_USER_BID_DETAILS } from '../mutation-types';

const state = {
	fetched: false,
	bid: {}
}

const mutations = {
	[SET_USER_BID_DETAILS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_BID_DETAILS](state, bid) {
		state.bid = bid;
	}
}

const actions = {
	
}

const getters = {
	userBidDetailsFetched: state => state.fetched,
	userBidDetails: state => state.bid
}

export default {
	state,
	mutations,
	actions,
	getters
}