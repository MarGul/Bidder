import VueRouter from 'vue-router';

/**
 * All of the applications routes
 */
let routes = [
	{ path: "/", component: require('./views/Home.vue') },
	{ path: "/categories", component: require('./views/Categories.vue') },
	{ path: "/regions", component: require('./views/Regions.vue') },
	{ path: "/information", component: require('./views/Information.vue') },
	{ path: "/register", component: require('./views/Register.vue') },
	{ path: "/login", component: require('./views/Login.vue') },
	
	/* 404 is handled by the vue application */
	{ path: "*", component: require('./views/404.vue') }
];

export default new VueRouter({
	routes,
	linkActiveClass: 'active',
	mode: 'history'
});