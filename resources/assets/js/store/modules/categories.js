const categories = {
	state: {
		categories: []
	},
	mutations: {
		'SET_CATEGORIES'(state, categories) {
			state.categories = categories;
		}
	},
	actions: {
		fetchCategories({commit}) {
			commit('SET_CATEGORIES', [{test:'test'}, {test2: 'test2'}]);
		}
	},
	getters: {
		getCategories: state => state.categories
	}
}

export default categories;