import ServiceModel from "../../includes/models/Service"; 

const service = {
	state: {
		service: {comments: [], bids: []}
	},
	mutations: {
		'SET_SERVICE'(state, service) {
			state.service = service;
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
		getService: state => state.service
	}
}

export default service;