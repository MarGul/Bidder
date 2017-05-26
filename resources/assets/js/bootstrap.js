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
import VueRouter from 'vue-router';
Vue.use(VueRouter);

/**
 * Global Vue components and Prototypes
 */
Vue.component('app-hero', require('./components/Includes/Hero'));
Vue.component('app-loading', require('./components/Includes/Loading'));

import filters from "./includes/filters";
Vue.prototype.filters = filters;

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