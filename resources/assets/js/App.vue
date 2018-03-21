<template>
    <div id="site">
        
        <transition name="notification-slide-down-up">
            <app-notifications v-if="$store.getters.notificationShowing" />
        </transition>

        <transition name="event-notification-animation">
            <app-event-notification v-if="$store.getters.eventNotificationShowing" />
        </transition>

        <app-modal />


        <app-header />

        <app-mobile-menu v-if="breakpoints.isSmallDevices()" />

        <div class="site-wrapper">

            <router-view></router-view>

            <app-footer></app-footer>

        </div>

    </div>
</template>

<script>
    import appMobileHeader from './components/Layout/MobileHeader';
    import appDesktopHeader from './components/Layout/DesktopHeader';
    import appNotifications from './components/Includes/Notifications';
    import appEventNotification from './components/Includes/EventNotification';
    import appModal from './components/Includes/Modal';
    import appFooter from './components/Layout/Footer';
    import { HeartBeat } from './includes/heartbeat';
    import Model from './includes/Model';
    import RealTimeEvents from './realTimeEvents';

    import appHeader from './components/Layout/Header';
    import appMobileMenu from './components/Layout/MobileMenu';

    export default {
        components: {
            appMobileHeader,
            appDesktopHeader,
            appNotifications,
            appEventNotification,
            appModal,
            
            
            appHeader,
            appMobileMenu,
            
            appFooter
        },
        data() {
            return {
                breakpoints: window.breakpoints,
            }
        },
        computed: {
            authenticated() {
                return this.$store.getters.isAuthenticated;
            }
        },
        watch: {
            authenticated(newAuth, oldAuth) {
                if ( newAuth ) {
                    // If the user logs in we need to start listening for he's real time events.
                    RealTimeEvents.listenAuth();
                    // If the user logs in we set his userId for GA
                    this.$ga.set('userId', this.$store.getters.authUser.id);

                    this.$store.dispatch('getNotifications');
                } else {
                    // If the user logs out we need to remove the userId for GA
                    this.$ga.set('userId', '');
                }
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
                this.$store.commit('SET_REGIONS', response.data.regions);
                this.$store.commit('SET_REGIONS_FETCHED', true);
            });

            RealTimeEvents.listen(); 
            
            if ( this.authenticated ) {
                // Set the userId for GA
                this.$ga.set('userId', this.$store.getters.authUser.id);
                this.$store.dispatch('getNotifications');
            }

            // Start the applications heartbeat
            setInterval(function() {
                HeartBeat.$emit('beat');
            }, 1000)
        }
    }
</script>
