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
	{ path: "/user", name: 'user', component: require('./views/User.vue') },
	
	/* 404 is handled by the vue application */
	{ path: "*", component: require('./views/404.vue') }
];

export default new VueRouter({
	routes,
	linkActiveClass: 'active',
	mode: 'history'
});