/**
 * Load in jQuery
 */
window.$ = window.jQuery = require('jquery');

/**
 * Load in vue
 */
window.Vue = require('vue');

/**
 * Tell vue to use the first-package vue-router
 */
Vue.use(require('vue-router'));

/**
 * Load in Axios HTTP framework.
 */
window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

/**
 * Object to handle Twitter bootstrap breakpoints
 */
import Breakpoints from './classes/BootstrapBreakpoints';
window.breakpoints = new Breakpoints;