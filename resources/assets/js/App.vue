<template>
    <div id="site">
        <transition name="notification-slide-down-up">
            <app-notifications v-if="$store.getters.showingNotification"></app-notifications>
        </transition>

        <app-mobile-header v-if="breakpoints.mobile"></app-mobile-header>
        <app-desktop-header v-else></app-desktop-header>

        <transition name="slide-down-up">
            <app-modal v-if="$store.getters.modalOpen"></app-modal>
        </transition>

        <div id="site-wrap">
            <div class="overlay" @click="hideMobileNav" v-if="breakpoints.mobile"></div>

            <!-- This is where the router view component will be loaded -->
            <router-view></router-view>

            <app-footer></app-footer>
        </div>

    </div>
</template>

<script>
    import appMobileHeader from './components/Layout/MobileHeader';
    import appDesktopHeader from './components/Layout/DesktopHeader';
    import appNotifications from './components/Includes/Notifications';
    import appModal from './components/Includes/Modal';
    import appFooter from './components/Layout/Footer';
    import { HeartBeat } from './includes/heartbeat';

    import Model from './includes/Model';

    export default {
        components: {
            appMobileHeader,
            appDesktopHeader,
            appNotifications,
            appModal,
            appFooter
        },
        data() {
            return {
                breakpoints: window.breakpoints,
            }
        },
        methods: {
            hideMobileNav() {
                document.body.classList.remove('mobile-nav-open');
            }
        },
        created() {
            // Initialize Data
            new Model('categories').get().then(response => {
                this.$store.commit('SET_CATEGORIES', response.data.categories);
                this.$store.commit('SET_CATEGORIES_FETCHED', true);
            });
            new Model('regions').get().then(response => {
                this.$store.commit('SET_REGIONS', response.regions);
                this.$store.commit('SET_REGIONS_FETCHED', true);
            });

            // Listen to global broadcasts
            Echo.channel('services')
                .listen('NewService', (e) => {
                    this.$store.dispatch('addService', {service: e.service});
                })
                .listen('RemoveService', (e) => {
                    this.$store.dispatch('removeService', {id: e.id});
                });

            // Start the applications heartbeat
            setInterval(function() {
                HeartBeat.$emit('beat');
            }, 1000)
        }
    }
</script>
