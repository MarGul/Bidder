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
		'SET_LOADED'(state, loaded) {
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
						commit('SET_LOADED', true);

						resolve(true);
					})
					.catch(error => { console.log(error); });
			});
		},
		addService({commit, state}, payload) {

		},
		removeService({commit, state}, payload) {
			let sleep = function(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			}
			sleep(Math.random() * 10).then(() => {
				state.services.splice(state.services.findIndex(e => e.id == payload.id), 1);
			});
		}
	},
	getters: {
		servicesLoaded: state => state.loaded,
		servicesLoadingMore: state => state.isLoadingMore,
		servicesCanLoadMore: state => state.canLoadMore,
		services: state => state.services
	}
}

export default services;