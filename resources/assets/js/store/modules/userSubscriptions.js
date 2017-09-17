import { SET_SUBSCRIPTIONS_FETCHED, SET_SUBSCRIPTIONS } from '../mutation-types';

const state = {
	fetched: false,
	subscriptions: []
}

const mutations = {
	[SET_SUBSCRIPTIONS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_SUBSCRIPTIONS](state, subscriptions) {
		state.subscriptions = subscriptions;
	}
}

const actions = {
	
}

const getters = {
	subscriptionsFetched: state => state.fetched,
	subscriptions: state => state.subscriptions
}

export default {
	state,
	mutations,
	actions,
	getters
}