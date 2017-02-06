/**
 * Load in vue
 */

window.Vue = require('vue');

/**
 * Load in Axios HTTP framework.
 */

window.axios = require('axios');

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};