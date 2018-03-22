<template>
    <div class="header-actions__auth">
        
        <div 
            class="header-actions__auth__notifications-icon" 
            @click="$emit('notificationDropdownChanged', !notificationsDropdown)"
            v-click-outside="closeNotificationsDropdown"
        >
            <i class="icon icon_notifications wh20 white"></i>
            <span 
                class="header-actions__auth__notifications-icon__badge" 
                v-text="unreadNotifications" 
                v-if="unreadNotifications !== 0" 
            />
        </div>

        <div 
            class="header-actions__auth__user" 
            @click="$emit('authDropdownChanged', !authDropdown)" 
            v-click-outside="closeAuthDropdown"
            v-if="!breakpoints.isSmallDevices()"
        >
            <avatar :imageUrl="user.avatar" class="-has-border" />
            <i class="icon wh20 white ml5" :class="[chevron]"></i>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import avatar from '../components/Avatar';

export default {
  
    name: 'HeaderActionsAuth',

    components: {
        avatar
    },

    props: {
        notificationsDropdown: {
            type: Boolean,
            required: true
        },
        authDropdown: {
            type: Boolean,
            required: true
        }
    },

    computed: {
        ...mapGetters({
            user: 'authUser',
            unreadNotifications: 'userUnreadNotifications'
        }),
        breakpoints() {
            return window.breakpoints;
        },
        chevron() {
            return this.authDropdown ? 'h_cheveron_up' : 'h_cheveron_down';
        }
    },

    methods: {
        closeNotificationsDropdown() {
            this.$emit('notificationDropdownChanged', false)
        },
        closeAuthDropdown() {
            this.$emit('authDropdownChanged', false)
        }
    }

}
</script>

