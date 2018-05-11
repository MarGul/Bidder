/**
 * Bootstrap the application.
 */
require('./bootstrap');
/**
 * Import the Application. This is the starting point for the App.
 */
import App from './App.vue';
/**
 * Import the Vuex store.
 */
import store from './store/store';
/**
 * All of the applications routes. Great starting point for overview of app.
 */
import router from './router';
/**
 * Use Google Analytics
 */
import VueAnalytics from 'vue-analytics';
import trackingCommands from './trackingCommands';

Vue.use(VueAnalytics, {
    id: 'UA-118980196-1',
    router,
    commands: trackingCommands,
    debug: {
        enabled: false
    }
});

/**
 * Create the Vue instance.
 */
const app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
