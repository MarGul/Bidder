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
			{ path: '', component: require('./components/User/Profile.vue') },
			{ path: 'profile', component: require('./components/User/Profile.vue') },
			{ path: 'notifications', component: require('./components/User/Notifications.vue') },
			{ path: 'create-service', component: require('./components/User/CreateService.vue') },
			{ path: 'my-services', component: require('./components/User/MyServices.vue') },
			{ path: 'my-bids', component: require('./components/User/MyBids.vue') },
			{ path: 'payments', component: require('./components/User/Payments.vue') },
		]
	},
	
	/* 404 is handled by the vue application */
	{ path: "*", component: require('./views/404.vue') }
];

const router = new VueRouter({
	routes,
	linkActiveClass: 'active',
	mode: 'history'
});

router.beforeEach((to, from, next) => {
  
	// Close the userNav dropdown.
	router.app.$store.commit('SET_DROPDOWN', {dropdown: false});

  next();
});

export default router;