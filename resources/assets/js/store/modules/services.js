import { SET_SERVICES_FETCHED, SET_SERVICES_PAGE, SET_SERVICES_CAN_LOAD_MORE, SET_SERVICES } from "../mutation-types";

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

/*
import Model from "../../includes/Model"; 

const services = {
	state: {
		loaded: false,
		page: 1,
		isLoadingMore: false,
		canLoadMore: false,
		services: []
	},
	mutations: {
		'SET_SERVICES_FETCHED'(state, loaded) {
			state.loaded = loaded;
		},
		'SET_PAGE'(state, page) {
			state.page = page;
		},
		'SET_IS_LOADING_MORE'(state, loading) {
			state.loading = loading;
		},
		'SET_CAN_LOAD_MORE'(state, canLoadMore) {
			state.canLoadMore = canLoadMore;
		},
		'SET_SERVICES'(state, services) {
			state.services = services;
		}
	},
	actions: {
		getServices({commit, state, rootState}, payload) {
			return new Promise((resolve, reject) => {
				if ( payload.appending ) {
					commit('SET_PAGE', state.page + 1);
					commit('SET_IS_LOADING_MORE', true);
				}

				let data = {page: rootState.services.page}
				if ( rootState.servicesFilter.text ) data.text = rootState.servicesFilter.text;
				if ( rootState.servicesFilter.categories.length > 0 ) data.categories = rootState.servicesFilter.categories.map(cat => cat.value).join();
				if ( rootState.servicesFilter.regions.length > 0 ) data.regions = rootState.servicesFilter.regions.map(reg => reg.value).join();
				if ( rootState.servicesFilter.cities.length > 0 ) data.cities = rootState.servicesFilter.cities.map(cit => cit.value).join();
				
				new Model('services')
					.get(data)
					.then(({services}) => {
						commit('SET_CAN_LOAD_MORE', services.next_page_url ? true : false);
						commit('SET_IS_LOADING_MORE', false);
						commit('SET_SERVICES', payload.appending ? state.services.concat(services.data) : services.data);
						commit('SET_SERVICES_FETCHED', true);

						resolve(true);
					})
					.catch(error => { console.log(error); });
			});
		},
		addService({commit, state, rootState}, payload) {
			if ( rootState.servicesFilter.text && !payload.service.title.includes(rootState.servicesFilter.text) ) {
				return;
			} 
			if ( rootState.servicesFilter.categories.length && 
				!rootState.servicesFilter.categories.find(e => e.value === payload.service.category_id) ) {
				return;
			}
			if ( rootState.servicesFilter.regions.length && 
				!rootState.servicesFilter.regions.find(e => e.value === payload.service.region_id) ) {
				return;
			}
			if ( rootState.servicesFilter.cities.length && 
				!rootState.servicesFilter.cities.find(e => e.value === payload.service.city_id) ) {
				return;
			}

			let services = state.services;
			services.push(payload.service);
			services = services.sort((a,b) => a.bid_stop.localeCompare(b.bid_stop));
			commit('SET_SERVICES', services);
		},
		removeService({commit, state}, payload) {
			let serviceIndex = state.services.findIndex(e => e.id === payload.id);
			if ( serviceIndex !== -1 ) {
				state.services.splice(state.services.findIndex(e => e.id == payload.id), 1);
			}
		}
	},
	getters: {
		servicesLoaded: state => state.loaded,
		servicesLoadingMore: state => state.isLoadingMore,
		servicesCanLoadMore: state => state.canLoadMore,
		services: state => state.services
	}
}

export default services;*/