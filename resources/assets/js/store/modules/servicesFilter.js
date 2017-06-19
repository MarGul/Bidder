import Model from '../../includes/Model';

const servicesFilter = {
	state: {
		text: '',
		categories: [],
		regions: [],
		cities: [],
		locations: []
	},
	mutations: {
		'SET_FILTER_TEXT'(state, payload) {
			state.text = payload.text;
		},
		'SET_FILTER_CATEGORIES'(state, payload) {
			state.categories = payload.categories;
		},
		'SET_FILTER_REGIONS'(state, payload) {
			state.regions = payload.regions;
		},
		'SET_FILTER_CITIES'(state, payload) {
			state.cities = payload.cities;
		},
		'SET_FILTER_LOCATIONS'(state, payload) {
			state.locations = payload.locations;
		}
	},
	actions: {
		addFilterCategory({commit, state}, payload) {
			let categories = state.categories;
			categories.push(payload.category)
			commit('SET_FILTER_CATEGORIES', {categories});
		},
		removeFilterCategory({commit, state}, payload) {
			let categories = state.categories;
			categories.splice(payload.index, 1);
			commit('SET_FILTER_CATEGORIES', {categories});
		},
		addFilterLocation({commit, state}, payload) {
			let locations = state.locations;
			locations.push(payload.location);
			commit('SET_FILTER_LOCATIONS', {locations});
			// Also add the location to either region or city.
			if ( payload.location.type === 'region' ) {
				let regions = state.regions;
				regions.push(payload.location);
				commit('SET_FILTER_REGIONS', {regions});
			} else {
				let cities = state.cities;
				cities.push(payload.location);
				commit('SET_FILTER_CITIES', {cities});
			}
		},
		removeFilterLocation({commit, state}, payload) {
			// Remove it from locations array.
			let locations = state.locations;
			locations.forEach((location, index) => {
				if ( location.value === payload.location.value && location.type == payload.location.type ) {
					locations.splice(index, 1);
					return;
				}
			});
			commit('SET_FILTER_LOCATIONS', {locations});
			// Remove it from either regions or cities
			if ( payload.location.type === 'region' ) {
				let regions = state.regions;
				regions.forEach((region, index) => {
					if ( region.value === payload.location.value ) {
						regions.splice(index, 1);
					}
				});
				commit('SET_FILTER_REGIONS', {regions});
			} else {
				let cities = state.cities;
				cities.forEach((city, index) => {
					if ( city.value === payload.location.value ) {
						cities.splice(index, 1);
					}
				});
				commit('SET_FILTER_CITIES', {cities});
			}
		}
	},
	getters: {
		getFilterText: state => state.text,
		getFilterCategories: state => state.categories,
		getFilterRegions: state => state.regions,
		getFilterCities: state => state.cities,
		getFilterLocations: state => state.locations,
	}
}

export default servicesFilter;