<template>
    <div id="site">
        
        <app-mobile-header v-if="breakpoints.mobile"></app-mobile-header>
        <app-desktop-header v-else></app-desktop-header>

        <app-notifications v-if="$store.getters.showingNotification"></app-notifications>

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
    import appSearch from './components/Includes/Search';
    import appFooter from './components/Layout/Footer';
    import { HeartBeat } from './includes/heartbeat';

    export default {
        components: {
            appMobileHeader,
            appDesktopHeader,
            appNotifications,
            appModal,
            appSearch,
            appFooter
        },
        data() {
            return {
                breakpoints: window.breakpoints,
            }
        },
        methods: {
            hideMobileNav() {
                $('body').removeClass('mobile-nav-open');
            }
        },
        created() {
            // Initialize Data
            this.$store.dispatch('fetchCategories');
            this.$store.dispatch('fetchRegions');
            // Start the applications heartbeat
            setInterval(function() {
                HeartBeat.$emit('beat');
            }, 1000)
        }
    }
</script>
