import VueRouter from 'vue-router';

/**
 * All of the applications routes
 */

let routes = [
	{ path: "/", name: 'home', component: require('./views/Home') },
	{ path: "/email-verified", name: 'emailVerified', component: require('./views/EmailVerified') },
	{ path: "/welcome", name: 'welcome', component: require('./views/Welcome'), meta: { requiresAuth: true } },
	{ path: "/services", name: 'services', component: require('./views/Services') },
	{ path: "/services/:id", component: require('./views/ServiceDetails'), 
		children: [
			{ path: '', name: 'serviceDetails', component: require('./components/Services/ServiceDetailsView') },
			{ path: 'bids', name: 'serviceBids', component: require('./components/Services/ServiceDetailsBids') }
		]
	},
	{ path: "/about", name: 'about', component: require('./views/About') },
	{ path: "/faq", name: 'faq', component: require('./views/Faq') },
	{ path: "/terms", name: 'terms', component: require('./views/Terms') },
	{ path: "/how-to-create-service", name: 'howToCreateService', component: require('./views/HowToCreateService') },
	{ path: "/profile/:username", name: 'profile', component: require('./views/Profile')},
	{ path: "/user", component: require('./views/User'),
		children: [
			{ path: '', component: require('./components/User/Profile/Profile'), meta: { requiresAuth: true } },
			{ path: 'profile', component: require('./components/User/Profile/Profile'), meta: { requiresAuth: true } },
			{ path: 'notifications', component: require('./components/User/Notifications/Notifications'), meta: { requiresAuth: true } },
			{ path: 'create-service', component: require('./components/User/Services/CreateService'), meta: { requiresAuth: true } },
			{ path: 'services', component: require('./components/User/Services/MyServices'), meta: { requiresAuth: true } },
			{ path: 'services/:id', component: require('./components/User/Services/EditService'), meta: { requiresAuth: true } },
			{ path: 'bids', component: require('./components/User/Bids/MyBids'), meta: { requiresAuth: true } },
			{ path: 'bids/:id', component: require('./components/User/Bids/BidDetails'), meta: { requiresAuth: true } },
			{ path: 'projects', component: require('./components/User/Projects/MyProjects'), meta: { requiresAuth: true } },
			{ path: 'projects/:id', component: require('./components/User/Projects/Project'), meta: { requiresAuth: true },
				children: [
					{ path: '', component: require('./components/User/Projects/ProjectPhase'), meta: { requiresAuth: true } },
					{ path: 'contract', component: require('./components/User/Projects/ProjectContract'), meta: { requiresAuth: true } },
					{ path: 'service', component: require('./components/User/Projects/ProjectService'), meta: { requiresAuth: true } },
					{ path: 'bid', component: require('./components/User/Projects/ProjectBid'), meta: { requiresAuth: true } },
					{ path: 'messages', component: require('./components/User/Projects/ProjectMessages'), meta: { requiresAuth: true } },
					{ path: 'history', component: require('./components/User/Projects/ProjectHistory'), meta: { requiresAuth: true } },
				]
			},
			{ path: 'invoices', component: require('./components/User/Invoices/MyInvoices'), meta: { requiresAuth: true } },
			{ path: 'invoices/:id', component: require('./components/User/Invoices/InvoiceDetails'), meta: { requiresAuth: true } },
			{ path: 'subscriptions', component: require('./components/User/Subscriptions/MySubscriptions'), meta: { requiresAuth: true } },
		],
		meta: { requiresAuth: true }
	},

	// Version 2
	{ path: '/v2/home', name: 'v2.home', component: require('./v2/views/Home') },
	
	// 404 is handled by the vue application
	{ path: "*", component: require('./views/404.vue') }
];

const router = new VueRouter({
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0};
	}
});

/*
	The router authentication guard.
 */
router.beforeEach((to, from, next) => {
	if ( to.meta.requiresAuth ) {
		if ( !router.app.$store.getters.isAuthenticated ) {
			next('/');
			router.app.$store.commit('SET_AUTHENTICATED_INTENDED', to.path);
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

export default router;