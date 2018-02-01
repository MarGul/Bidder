import { SET_FILTER_TEXT, SET_FILTER_CATEGORIES, SET_FILTER_CITIES } from '../mutation-types';

const state = {
	text: '',
	categories: [],
	cities: []
}

const mutations = {
	[SET_FILTER_TEXT](state, text) {
		state.text = text;
	},
	[SET_FILTER_CATEGORIES](state, categories) {
		state.categories = categories;
	},
	[SET_FILTER_CITIES](state, cities) {
		state.cities = cities;
	}
}

const actions = {
	
}

const getters = {
	filterText: state => state.text,
	filterCategories: state => state.categories,
	filterCities: state => state.cities
}

export default {
	state,
	mutations,
	actions,
	getters
}