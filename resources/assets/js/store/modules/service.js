import Model from "../../includes/Model"; 

const service = {
	state: {
		loaded: false,
		service: {comments: [], user: {}},
		bids_loaded: false,
		bids: []
	},
	mutations: {
		'SET_LOADED'(state, loaded) {
			state.loaded = loaded;
		},
		'SET_SERVICE'(state, service) {
			state.service = service;
		},
		'SET_BIDS_LOADED'(state, loaded) {
			state.bids_loaded = loaded;
		},
		'SET_BIDS'(state, bids) {
			state.bids = bids;
		},
		'ADD_COMMENT'(state, payload) {
			state.service.comments.unshift(payload.comment);
		}
	},
	actions: {
		getService({commit}, payload) {
			// Set the base state first.
			commit('SET_LOADED', false);
			commit('SET_SERVICE', {comments: [], user: {}});
			new Model('services').find(payload.id)
			.then(response => {
				commit('SET_SERVICE', response.data.service);
				commit('SET_LOADED', true);
			}).catch(error => { });
		},
		getBids({commit, state}, payload) {
			// Set the base state first.
			commit('SET_BIDS_LOADED', false);
			commit('SET_BIDS', {bids: []});
			new Model('services/{id}/bids').setId(state.service.id).get()
				.then(response => {
					commit('SET_BIDS', response.bids);
					commit('SET_BIDS_LOADED', true);
				}).catch(error => { });
		},
		addBid({commit, state}, payload) {
			let service = state.service;
			service.bid_count = {count: service.bid_count ? service.bid_count.count + 1 : 1};
			commit('SET_SERVICE', service);
			// If we have fetched bids we should just add this new one to the list.
			if ( state.bids_loaded ) {
				let bids = state.bids;
				bids.unshift(payload.bid);
			}
		}
	},
	getters: {
		getServiceLoaded: state => state.loaded,
		getService: state => state.service,
		getBidsLoaded: state => state.bids_loaded,
		getBids: state => state.bids
	}
}

export default service;