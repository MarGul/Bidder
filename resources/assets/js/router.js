import VueRouter from 'vue-router';

/**
 * All of the applications routes
 */

/*
 Later on in production for code splitting
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
			{ path: 'services/:id', component: resolve => require(['./components/User/Services/EditService'], resolve), meta: { requiresAuth: true } },
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
	
	// 404 is handled by the vue application
	{ path: "*", component: resolve => require(['./views/404.vue'], resolve) }
];
*/

let routes = [
	{ path: "/", name: 'home', component: require('./views/Home') },
	{ path: "/categories", name: 'categories', component: require('./views/Categories') },
	{ path: "/locations", name: 'locations', component: require('./views/Locations') },
	{ path: "/services", name: 'services', component: require('./views/Services') },
	{ path: "/services/:id", name: 'serviceDetails', component: require('./views/ServiceDetails') },
	{ path: "/information", name: 'information', component: require('./views/Information') },
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
	
	// 404 is handled by the vue application
	{ path: "*", component: require('./views/404.vue') }
];

const router = new VueRouter({
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'exact-active',
	mode: 'history'
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