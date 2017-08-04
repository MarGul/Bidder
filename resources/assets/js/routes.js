import VueRouter from 'vue-router';

/**
 * All of the applications routes
 */
let routes = [
	{ path: "/", name: 'home', component: resolve => require(['./views/Home'], resolve) },
	{ path: "/categories", name: 'categories', component: resolve => require(['./views/Categories'], resolve) },
	{ path: "/locations", name: 'locations', component: resolve => require(['./views/Locations'], resolve) },
	{ path: "/services", name: 'services', component: resolve => require(['./views/Services'], resolve) },
	{ path: "/services/:id", name: 'serviceDetails', component: resolve => require(['./views/ServiceDetails'], resolve) },
	{ path: "/information", name: 'information', component: resolve => require(['./views/Information'], resolve) },
	{ path: "/profile/:username", name: 'profile', component: resolve => require(['./views/Profile'], resolve)},
	{ path: "/user", name: 'user', component: resolve => require(['./views/User'], resolve),
		children: [
			{ path: '', component: resolve => require(['./components/User/Profile/Profile'], resolve), meta: { requiresAuth: true } },
			{ path: 'profile', component: resolve => require(['./components/User/Profile/Profile'], resolve), meta: { requiresAuth: true } },
			{ path: 'notifications', component: resolve => require(['./components/User/Notifications/Notifications'], resolve), meta: { requiresAuth: true } },
			{ path: 'create-service', component: resolve => require(['./components/User/Services/CreateService'], resolve), meta: { requiresAuth: true } },
			{ path: 'services', component: resolve => require(['./components/User/Services/MyServices'], resolve), meta: { requiresAuth: true } },
			{ path: 'bids', component: resolve => require(['./components/User/Bids/MyBids'], resolve), meta: { requiresAuth: true } },
			{ path: 'projects', component: resolve => require(['./components/User/Projects/MyProjects'], resolve), meta: { requiresAuth: true } },
			{ path: 'project/:id', component: resolve => require(['./components/User/Projects/Project'], resolve), meta: { requiresAuth: true } },
			{ path: 'invoices', component: resolve => require(['./components/User/Invoices/MyInvoices'], resolve), meta: { requiresAuth: true } },
			{ path: 'invoices/:id', component: resolve => require(['./components/User/Invoices/InvoiceDetails'], resolve), meta: { requiresAuth: true } },
			{ path: 'service/:id/bids', component: resolve => require(['./components/User/Bids/BidHistory'], resolve), meta: { requiresAuth: true } },
			{ path: 'subscriptions', component: resolve => require(['./components/User/Subscriptions/MySubscriptions'], resolve), meta: { requiresAuth: true } },
		],
		meta: { requiresAuth: true }
	},
	
	/* 404 is handled by the vue application */
	{ path: "*", component: resolve => require(['./views/404.vue'], resolve) }
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
	//router.app.$store.dispatch('closeNotification');
});

export default router;