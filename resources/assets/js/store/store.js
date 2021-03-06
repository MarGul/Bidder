import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Import modules
import categories from './modules/categories';
import regions from './modules/regions';
import modal from './modules/modal';
import auth from './modules/auth';
import servicesFilter from './modules/servicesFilter';
import services from './modules/services';
import service from './modules/service';
import notifications from './modules/notifications';
import eventNotification from './modules/eventNotification';
import userBids from './modules/userBids';
import userBidDetails from './modules/userBidDetails';
import userProjects from './modules/userProjects';
import userProjectDetails from './modules/userProjectDetails';
import userNotifications from './modules/userNotifications';
import userServices from './modules/userServices';
import userSubscriptions from './modules/userSubscriptions';
import userServiceDetails from './modules/userServiceDetails';
import userInvoices from './modules/userInvoices';

export default new Vuex.Store({
	modules: {
		categories,
		regions,
		modal,
		auth,
		servicesFilter,
		services,
		service,
		notifications,
		eventNotification,
		userBids,
		userBidDetails,
		userProjects,
		userProjectDetails,
		userNotifications,
		userServices,
		userServiceDetails,
		userSubscriptions,
		userInvoices
	}
});