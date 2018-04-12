<template>
    <header class="site-header-container">
        <div class="container">
            <div class="site-header">
                <div class="mobile-menu-toggle" @click="toggleMobileMenu" v-if="breakpoints.isSmallDevices()"><span></span></div>
                
                <div class="logo-container">
                    <router-link to="/">
                        <img src="/images/logo.png" alt="GoBid Logo" />
                    </router-link>
                </div>

                <nav class="navigation-container" v-if="!breakpoints.isSmallDevices()">
                    <desktop-navigation />
                </nav>

                <div class="header-actions">
                    
                    <header-actions-guest v-if="!authenticated && !breakpoints.isSmallDevices()" />
                    
                    <header-actions-auth 
                        :authDropdown="authDropdown"
                        :notificationsDropdown="notificationsDropdown"
                        @authDropdownChanged="authDropdown = $event"
                        @notificationDropdownChanged="notificationsDropdown = $event"
                        v-if="authenticated" 
                    />

                </div>

                <auth-dropdown v-if="authDropdown" />
                <notifications-dropdown v-if="notificationsDropdown" />
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import notificationsDropdown from './NotificationsDropdown';
import authDropdown from './AuthDropdown';
import desktopNavigation from './DesktopNavigation';
import headerActionsGuest from './HeaderActionsGuest';
import headerActionsAuth from './HeaderActionsAuth';

export default {

    name: 'Header',
    
    components: {
        desktopNavigation,
        headerActionsGuest,
        headerActionsAuth,
        authDropdown,
        notificationsDropdown
    },

    data() {
        return {
            authDropdown: false,
            notificationsDropdown: false
        }
    },

    computed: {
        ...mapGetters({
            authenticated: 'isAuthenticated'
        }),
        breakpoints() {
            return window.breakpoints;
        }
    }, 

    methods: {
        toggleMobileMenu() {
            if ( document.body.classList.contains('mobile-menu-open') ) {
                document.body.classList.remove('mobile-menu-open');
            } else {
                document.body.classList.add('mobile-menu-open');
            }
        }
    }
}
</script>

