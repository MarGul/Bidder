import { 
	SET_USER_SERVICE_DETAILS_FETCHED,
	SET_USER_SERVICE_DETAILS_SERVICE
} from '../mutation-types';


const state = {
	serviceFetched: false,
	service: {}
}

const mutations = {
	[SET_USER_SERVICE_DETAILS_FETCHED](state, fetched) {
		state.serviceFetched = fetched;
	},
	[SET_USER_SERVICE_DETAILS_SERVICE](state, service) {
		state.service = service;
	}
}

const actions = {
	bidAccepted({commit, state}, payload) {
		let bids = state.bids;
		bids.forEach(function(bid) {
			if ( bid.id === payload.id ) {
				bid.accepted = true;
			}
		});
		commit('SET_USER_SERVICE_DETAILS_BIDS', bids);
		// Set the service to not be active anymore and that it has an accepted bid
		let service = state.service;
		service.active = false;
		service.has_accepted_bid = true;
		commit('SET_USER_SERVICE_DETAILS_SERVICE', service);
	},
	clearServiceDetailsState({commit}) {
		commit('SET_USER_SERVICE_DETAILS_FETCHED', false);
		commit('SET_USER_SERVICE_DETAILS_SERVICE', {});
	}
}

const getters = {
	serviceDetailsFetched: state => state.serviceFetched,
	serviceDetailsService: state => state.service
}

export default {
	state,
	mutations,
	actions,
	getters
}