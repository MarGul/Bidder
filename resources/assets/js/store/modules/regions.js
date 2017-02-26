import Region from '../../includes/models/Region';

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
			Region.all().then(({regions}) => {
				commit('SET_REGIONS', regions);
			});
		}
	},
	getters: {
		getRegions: state => state.regions,
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
		}
	}
}

export default regions;