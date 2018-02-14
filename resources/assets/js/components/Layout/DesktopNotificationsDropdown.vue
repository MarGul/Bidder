<template>
    <div class="desktop-notifications-dropdown">
        <div class="notifications-dropdown-top-container">
            <div class="notifications-dropdown-title">Notifieringar</div>
            <div class="notifications-dropdown-actions">
                <span class="is-link" @click="markRead">Markera alla som lästa</span>
                <span class="gray-sub-text mr5 ml5">&bull;</span>
                <router-link :to="`/user/notifications`" class="is-link">Inställningar</router-link>
            </div>
        </div>
        <div class="notifications-dropdown-body-container">
            <app-loading v-if="!fetched" class="mtb10"/>
            
            <app-notification 
                v-for="(notification, index) in notifications" 
                :key="index" 
                :data="Object.assign(notification.data, {read_at: notification.read_at, created_at: notification.created_at})"
                v-else-if="fetched && notifications.length > 0"
            />

            <div class="alert alert-info text-center m0" v-else>Du har inga notifieringar än.</div>
        </div>
        <div class="notifications-dropdown-footer-container">
            <router-link :to="`/user/notifications`" class="is-link is-weight-500" v-text="`Visa alla`" />
        </div>
    </div>
</template>

<script>
import appNotification from '../Includes/OneNotification';
import { mapGetters } from 'vuex';

export default {
    components: {
        appNotification
    },
    computed: {
        ...mapGetters({
            fetched: 'userNotificationsFetched',
            notifications: 'userNotifications'
        })
    },
    methods: {
        markRead() {
            this.$store.dispatch('markNotificationsAsRead');
        }
    }
}
</script>

