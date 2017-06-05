import VueRouter from 'vue-router';

/**
 * All of the applications routes
 */
let routes = [
	{ path: "/", name: 'home', component: require('./views/Home.vue') },
	{ path: "/categories", name: 'categories', component: require('./views/Categories.vue') },
	{ path: "/locations", name: 'locations', component: require('./views/Locations.vue') },
	{ path: "/services", name: 'services', component: require('./views/Services.vue') },
	{ path: "/services/:id", name: 'serviceDetails', component: require('./views/ServiceDetails.vue') },
	{ path: "/information", name: 'information', component: require('./views/Information.vue') },
	{ path: "/user", name: 'user', component: require('./views/User.vue'),
		children: [
			{ path: '', component: require('./components/User/Profile/Profile.vue'), meta: { requiresAuth: true } },
			{ path: 'profile', component: require('./components/User/Profile/Profile.vue'), meta: { requiresAuth: true } },
			{ path: 'notifications', component: require('./components/User/Notifications.vue'), meta: { requiresAuth: true } },
			{ path: 'create-service', component: require('./components/User/Services/CreateService.vue'), meta: { requiresAuth: true } },
			{ path: 'my-services', component: require('./components/User/Services/MyServices.vue'), meta: { requiresAuth: true } },
			{ path: 'my-bids', component: require('./components/User/Bids/MyBids.vue'), meta: { requiresAuth: true } },
			{ path: 'my-projects', component: require('./components/User/Projects/MyProjects.vue'), meta: { requiresAuth: true } },
			{ path: 'project/:id', component: require('./components/User/Projects/Project.vue'), meta: { requiresAuth: true } },
			{ path: 'payments', component: require('./components/User/Payments.vue'), meta: { requiresAuth: true } },
			{ path: 'service/:id/bids', component: require('./components/User/Bids/BidHistory.vue'), meta: { requiresAuth: true } },
		],
		meta: { requiresAuth: true }
	},
	
	/* 404 is handled by the vue application */
	{ path: "*", component: require('./views/404.vue') }
];

const router = new VueRouter({
	routes,
	linkActiveClass: 'active',
	mode: 'history'
});

/*
	The router authentication guard.
 */
router.beforeEach((to, from, next) => {
	if ( to.meta.requiresAuth ) {
		if ( !router.app.$store.getters.isAuthenticated ) {
			next('/');
			router.app.$store.commit('SET_INTENDED', {intended: to.path});
			router.app.$store.dispatch('openModal', {
				component: 'login',
				alert: {
					type: 'warning',
					message: 'Oops! Du måste vara inloggad för att komma in där.' 
				}
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

/*
	Run to reset state after each new route.
 */
router.afterEach((to, from) => {
	// Close the userNav dropdown.
	router.app.$store.commit('SET_DROPDOWN', {dropdown: false});
	// Close the mobile user navigation dropdown.
	router.app.$store.commit('SET_MOBILE_DROPDOWN', {mobileDropdown: false});
	// Close notifications
	router.app.$store.dispatch('closeNotification');
});

export default router;