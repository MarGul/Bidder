<template>
    <header class="site-header">
        <div class="mobile-menu-toggle" @click="toggleMobileMenu"><span></span></div>
        <div class="logo-container">
            <router-link to="/">
                <img src="/images/logo.png" alt="GoBid Logo" />
            </router-link>
        </div>
        <div class="header-actions">
            <div class="is-flex c_c notifications-icon-container" @click="notificationsDropdown = !notificationsDropdown" v-if="authenticated">
                <i class="icon icon_notifications wh20 white"></i>
                <span class="notifications-badge" v-text="unreadNotifications" v-if="unreadNotifications !== 0" />
            </div>
        </div>

        <notifications-dropdown v-if="notificationsDropdown" />

    </header>
</template>

<script>
import { mapGetters } from 'vuex';
import notificationsDropdown from './NotificationsDropdown';

export default {
    components: {
        notificationsDropdown
    },
    data() {
        return {
            notificationsDropdown: false
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'isAuthenticated',
            unreadNotifications: 'userUnreadNotifications'
        })
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

