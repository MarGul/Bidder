import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Import modules
import categories from './modules/categories';
import regions from './modules/regions';
import modal from './modules/modal';
import auth from './modules/auth';
import user from './modules/user';
import servicesFilter from './modules/servicesFilter';
import services from './modules/services';
import service from './modules/service';
import notifications from './modules/notifications';
import userSubscriptions from './modules/userSubscriptions';
import userServiceDetails from './modules/userServiceDetails';

export default new Vuex.Store({
	modules: {
		categories,
		regions,
		modal,
		auth,
		user,
		servicesFilter,
		services,
		service,
		notifications,
		userServiceDetails,
		userSubscriptions
	}
});