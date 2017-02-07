import VueRouter from 'vue-router';

/**
 * All of the applications routes
 */
let routes = [
	{ path: "/", component: require('./components/Home/Home.vue') },
	
	/* 404 is handled by the vue application */
	{ path: "*", component: require('./components/Error/404.vue') }
];

export default new VueRouter({
	routes,
	linkActiveClass: 'active',
	mode: 'history'
});