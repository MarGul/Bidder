import ServiceModel from "../../includes/models/Service"; 

const service = {
	state: {
		service: {comments: [], bids: []}
	},
	mutations: {
		'SET_SERVICE'(state, service) {
			state.service = service;
		},
		'ADD_BID'(state, payload) {
			state.service.bids.unshift(payload.bid);
		}
	},
	actions: {
		getService({commit}, payload) {
			// Set the base state first.
			commit('SET_SERVICE', {comments: [], bids: []});
			ServiceModel.find(payload.id)
			.then(response => {
				commit('SET_SERVICE', response.service);
			}).catch(error => { });
		}
	},
	getters: {
		getService: state => state.service,
		getBids: state => state.service.bids
	}
}

export default service;