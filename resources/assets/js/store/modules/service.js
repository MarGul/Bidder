import ServiceModel from "../../includes/models/Service"; 

const service = {
	state: {
		loaded: false,
		service: {comments: [], bids: [], user: {}}
	},
	mutations: {
		'SET_LOADED'(state, loaded) {
			state.loaded = loaded;
		},
		'SET_SERVICE'(state, service) {
			state.service = service;
		},
		'ADD_BID'(state, payload) {
			state.service.bids.unshift(payload.bid);
		},
		'ADD_COMMENT'(state, payload) {
			state.service.comments.unshift(payload.comment);
		}
	},
	actions: {
		getService({commit}, payload) {
			// Set the base state first.
			commit('SET_LOADED', false);
			commit('SET_SERVICE', {comments: [], bids: [], user: {}});
			ServiceModel.find(payload.id)
			.then(response => {
				commit('SET_SERVICE', response.service);
				commit('SET_LOADED', true);
			}).catch(error => { });
		}
	},
	getters: {
		getServiceLoaded: state => state.loaded,
		getService: state => state.service,
		getServiceTitle: state => (state.service.title) ? state.service.title : '',
		getServiceDescription: state => (state.service.description) ? state.service.description : '',
		getServiceCategory: state => (state.service.category) ? state.service.category : {},
		getServiceCategoryName: state => (state.service.category) ? state.service.category.name : '',
		getServiceRegion: state => (state.service.region) ? state.service.region : {},
		getServiceRegionName: state => (state.service.region) ? state.service.region.name : '',
		getServiceCity: state => (state.service.city) ? state.service.city : {},
		getServiceCityName: state => (state.service.city) ? state.service.city.name : '',
		getBids: state => state.service.bids
	}
}

export default service;