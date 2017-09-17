import { SET_USER_BIDS_FETCHED, SET_USER_BIDS } from '../mutation-types';

const state = {
	fetched: false,
	bids: []
}

const mutations = {
	[SET_USER_BIDS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_USER_BIDS](state, bids) {
		state.bids = bids;
	}
}

const actions = {
	
}

const getters = {
	userBidsFetched: state => state.fetched,
	userBids: state => state.bids
}

export default {
	state,
	mutations,
	actions,
	getters
}