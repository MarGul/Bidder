import { SET_CATEGORIES_FETCHED, SET_CATEGORIES } from '../mutation-types';

const state = {
	fetched: false,
	categories: []
}

const mutations = {
	[SET_CATEGORIES_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_CATEGORIES](state, categories) {
		state.categories = categories;
	}
}

const actions = {
	
}

const getters = {
	categoriesFetched: state => state.fetched,
	categories: state => state.categories,
	categoryById: (state, getters) => id => getters.categoriesFlattened.find(cat => cat.id === id),
	categoriesFlattened: state => state.categories.reduce( (a,b) => a.concat([b].concat(b.sub_categories)), [])
}

export default {
	state,
	mutations,
	actions,
	getters
}