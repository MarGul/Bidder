import Category from '../../includes/models/Category';

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
			Category.all().then(({categories}) => {
				commit('SET_CATEGORIES', categories);
			});
		}
	},
	getters: {
		getCategories: state => state.categories
	}
}

export default categories;