/**
 * Load in jQuery
 */
window.$ = window.jQuery = require('jquery');

/**
 *  Load in Moment.js
 */
window.moment = require('moment');
window.moment.locale('sv')

/**
 * Load in vue
 */
window.Vue = require('vue');

/**
 * Tell vue to use the first-package vue-router
 */
Vue.use(require('vue-router'));

/**
 * Global Vue components 
 */
import Hero from './components/Includes/Hero.vue';

Vue.component('app-hero', Hero);


import Filters from './includes/filters';
Vue.prototype.filters = Filters;

/**
 * Load in Axios HTTP framework.
 */
window.axios = require('axios');

window.axios.defaults.baseURL = 'http://bidder.dev/api/v1/';
window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

/**
 * Object to handle Twitter bootstrap breakpoints
 */
import Breakpoints from './includes/classes/BootstrapBreakpoints';
window.breakpoints = new Breakpoints;