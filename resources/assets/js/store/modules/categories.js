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
		getCategories: state => state.categories,
		getCategoriesFlatten(state) {
			let flattenCategories = [];
			let flatten = function(categories) {
				categories.forEach(function(category, index) {
					if ( category.sub_categories ) {
						flatten(category.sub_categories);
					}
					return flattenCategories.push(category);
				});
			}
			flatten(state.categories);

			return flattenCategories;
		}
	}
}

export default categories;