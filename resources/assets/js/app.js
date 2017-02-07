
/**
 * Bootstrap the application
 */
require('./bootstrap');

/**
 * Import the Application. This is the starting point for the App.
 */
import App from './components/App.vue';
/**
 * All of the applications routes. Great starting point for overview of app.
 */
import router from './routes';


const app = new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
