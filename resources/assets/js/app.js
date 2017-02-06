
/**
 * Bootstrap the application
 */
require('./bootstrap');

import App from './components/App.vue';

const app = new Vue({
    el: '#app',
    render: h => h(App)
});
