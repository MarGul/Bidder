import { SET_FILTER_TEXT, SET_FILTER_CATEGORIES, SET_FILTER_LOCATIONS } from '../mutation-types';

const state = {
	text: '',
	categories: [],
	locations: []
}

const mutations = {
	[SET_FILTER_TEXT](state, text) {
		state.text = text;
	},
	[SET_FILTER_CATEGORIES](state, categories) {
		state.categories = categories;
	},
	[SET_FILTER_LOCATIONS](state, locations) {
		state.locations = locations;
	}
}

const actions = {
	
}

const getters = {
	filterText: state => state.text,
	filterCategories: state => state.categories,
	filterLocations: state => state.locations
}

export default {
	state,
	mutations,
	actions,
	getters
}