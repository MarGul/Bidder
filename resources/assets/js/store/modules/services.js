import { 
	SET_SERVICES_FETCHED, 
	SET_SERVICES_PAGE, 
	SET_SERVICES_CAN_LOAD_MORE, 
	SET_SERVICES 
} from "../mutation-types";

const state = {
	fetched: false,
	page: 1,
	canLoadMore: false,
	services: []
}

const mutations = {
	[SET_SERVICES_FETCHED](state, fetched) {
		state.fetched = fetched;
	},
	[SET_SERVICES_PAGE](state, page) {
		state.page = page;
	},
	[SET_SERVICES_CAN_LOAD_MORE](state, canLoadMore) {
		state.canLoadMore = canLoadMore;
	},
	[SET_SERVICES](state, services) {
		state.services = services;
	}
}

const actions = {
	addService({commit, state, rootState}, payload) {
		// Only add if we already have fetched services.
		if ( !state.fetched ) return;

		// Has the user filtered based on text? Only add the new service to the list if it matches.
		if ( rootState.servicesFilter.text && !payload.service.title.includes(rootState.servicesFilter.text) ) return;

		// Has the user filtered based on categories? Only add the new service to the list if it matches.
		let categories = rootState.servicesFilter.categories;		
		if ( categories.length && !categories.find(e => e.id === payload.service.category_id) ) return;

		// Has the user filtered based on regions? Only add the new service to the list if it matches.
		let regions = rootState.servicesFilter.locations.filter(loc => !loc.hasOwnProperty('region_id'));
		if ( regions.length && !regions.find(e => e.id === payload.service.region_id) ) return;

		// Has the user filtered based on cities? Only add the new service to the list if it matches.
		let cities = rootState.servicesFilter.locations.filter(loc => loc.hasOwnProperty('region_id'));
		if ( cities.length && !cities.find(e => e.id === payload.service.city_id) ) return;

		// Add the new service and sort it based on bidstop.
		let services = state.services;
		services.push(payload.service);
		services = services.sort((a,b) => a.bid_stop.localeCompare(b.bid_stop));
		commit('SET_SERVICES', services);
	},
	removeService({commit, state}, payload) {
		let services = state.services;
		let serviceIndex = services.findIndex(e => e.id === payload.id);
		if ( serviceIndex !== -1 ) {
			services.splice(serviceIndex, 1);
		}
		commit('SET_SERVICES', services);
	}
}

const getters = {
	servicesFetched: state => state.fetched,
	servicesPage: state => state.page,
	servicesCanLoadMore: state => state.canLoadMore,
	services: state => state.services
}

export default {
	state,
	mutations,
	actions,
	getters
}