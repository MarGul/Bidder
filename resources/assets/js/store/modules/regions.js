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
		getRegions: state => state.regions
	}
}

export default regions;