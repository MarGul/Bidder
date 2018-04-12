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
        </div>

        <app-footer />

    </div>
</template>

<script>
import appNotifications from './components/Includes/Notifications'
import appEventNotification from './components/Includes/EventNotification'
import appModal from './components/Includes/Modal'

import { HeartBeat } from './includes/heartbeat'
import Model from './includes/Model'
import RealTimeEvents from './realTimeEvents'

import appHeader from './patterns/Header'
import appMobileMenu from './patterns/MobileMenu'
import appFooter from './patterns/Footer'

export default {

    name: 'App',

    components: {
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
            return this.$store.getters.isAuthenticated
        }
    },

    watch: {
        authenticated(newAuth, oldAuth) {
            if ( newAuth ) {
                // If the user logs in we need to start listening for he's real time events.
                RealTimeEvents.listenAuth()
                // If the user logs in we set his userId for GA
                this.$ga.set('userId', this.$store.getters.authUser.id)

                this.$store.dispatch('getNotifications')
            } else {
                // If the user logs out we need to remove the userId for GA
                this.$ga.set('userId', '')
                // If the user logs outs we need to stop listen to authRealTime
                RealTimeEvents.stopListenAuth()
                window.auth.authenticated = false
                window.auth.user = {}
            }
        }
    }, 

    created() {
        // Initialize Data
        new Model('categories').get().then(response => {
            this.$store.commit('SET_CATEGORIES', response.data.categories)
            this.$store.commit('SET_CATEGORIES_FETCHED', true)
        })
        new Model('regions').get().then(response => {
            this.$store.commit('SET_REGIONS', response.data.regions)
            this.$store.commit('SET_REGIONS_FETCHED', true)
        })

        RealTimeEvents.listen() 
        
        if ( this.authenticated ) {
            // Set the userId for GA
            this.$ga.set('userId', this.$store.getters.authUser.id)
            this.$store.dispatch('getNotifications')
        }

        // Start the applications heartbeat
        setInterval(function() {
            HeartBeat.$emit('beat')
        }, 1000)
    }
}
</script>
