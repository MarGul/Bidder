import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Import modules
import categories from './modules/categories';
import regions from './modules/regions';

export default new Vuex.Store({
	modules: {
		categories,
		regions
	}
});