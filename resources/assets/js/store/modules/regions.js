import { SET_REGIONS_FETCHED, SET_REGIONS } from '../mutation-types';

const state = {
	fetched: false,
	regions: []
}

const mutations = {
	[SET_REGIONS_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_REGIONS](state, regions) {
		state.regions = regions;
	}
}

const actions = {
	
}

const getters = {
	regionsFetched: state => state.fetched,
	regions: state => state.regions,
	regionById: state => id => state.regions.find(r => r.id === id),
	regionsFlattened: state => state.regions.reduce( (a,b) => a.concat([b].concat(b.sub_categories)), []),
	cities: state => state.regions.reduce( (a,b) => a.concat(b.cities), []),
	cityById: (state, getters) => id => getters.cities.find(c => c.id === id)
}

export default {
	state,
	mutations,
	actions,
	getters
}