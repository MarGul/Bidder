import { 
	SET_USER_SERVICE_DETAILS_FETCHED,
	SET_USER_SERVICE_DETAILS_SERVICE,
	SET_USER_SERVICE_DETAILS_BID_ACCEPTED
} from '../mutation-types';


const state = {
	serviceFetched: false,
	service: {},
	bidAccepted: null
}

const mutations = {
	[SET_USER_SERVICE_DETAILS_FETCHED](state, fetched) {
		state.serviceFetched = fetched;
	},
	[SET_USER_SERVICE_DETAILS_SERVICE](state, service) {
		state.service = service;
	},
	[SET_USER_SERVICE_DETAILS_BID_ACCEPTED](state, accepted) {
		state.bidAccepted = accepted;
	}
}

const actions = {
	bidAccepted({commit, state}, payload) {
		commit('SET_USER_SERVICE_DETAILS_BID_ACCEPTED', true);
		let bids = state.bids;
		bids.forEach(function(bid) {
			if ( bid.id === payload.id ) {
				bid.accepted = true;
			}
		});
		commit('SET_USER_SERVICE_DETAILS_BIDS', bids);
		// Set the service to not be active anymore.
		let service = state.service;
		service.active = false;
		commit('SET_USER_SERVICE_DETAILS_SERVICE', service);
	},
	clearServiceDetailsState({commit}) {
		commit('SET_USER_SERVICE_DETAILS_FETCHED', false);
		commit('SET_USER_SERVICE_DETAILS_SERVICE', {});
		commit('SET_USER_SERVICE_DETAILS_BID_ACCEPTED', null);
	}
}

const getters = {
	serviceDetailsFetched: state => state.serviceFetched,
	serviceDetailsService: state => state.service,
	serviceDetailsBidAccepted: state => state.bidAccepted
}

export default {
	state,
	mutations,
	actions,
	getters
}