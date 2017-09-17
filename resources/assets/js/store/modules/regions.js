import Model from '../../includes/Model';

const regions = {
	state: {
		regions: []
	},
	mutations: {
		'SET_REGIONS'(state, regions) {
			state.regions = regions;
		}
	},
	actions: {
		fetchRegions({commit}) {
			new Model('regions').get().then(({regions}) => {
				commit('SET_REGIONS', regions);
			});
		}
	},
	getters: {
		getRegions: state => state.regions,
		getRegionById: state => id => {
			return id ? state.regions.filter(r => r.id === id)[0] : [];
		},
		getRegionsFlatten(state) {
			let flattenedRegions = [];
			let flatten = function(regions) {
				regions.forEach(function(region, index) {
					if ( region.cities ) {
						region.type = 'region';
						flatten(region.cities);
					} else {
						region.type = 'city';
					}

					return flattenedRegions.push(region);
				});
			}
			flatten(state.regions);

			return flattenedRegions;
		},
		getCityById: state => id => {
			let c = null;
			state.regions.forEach(function(region, index) {
				region.cities.forEach(function(city, index) {
					if ( city.id === id) {
						c = city;
						return;
					}
				});
				if ( c ) return;
			});
			return c;
		},
		getCities(state) {
			let cities = [];
			state.regions.forEach(function(region, index) {
				cities = cities.concat(region.cities);
			});
			return cities.sort((a,b) => a.name < b.name ? -1 : 1);
		}
	}
}

export default regions;