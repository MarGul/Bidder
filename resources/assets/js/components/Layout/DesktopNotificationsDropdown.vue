<template>
    <div class="desktop-notifications-dropdown">
        <div class="notifications-dropdown-top-container">
            <div class="notifications-dropdown-title">Notifieringar</div>
            <div class="notifications-dropdown-actions">
                <router-link :to="`/user/notifications`" class="is-link">Inställningar</router-link>
            </div>
        </div>
        <div class="notifications-dropdown-body-container">
            <app-loading v-if="!fetched" class="mtb10"/>
            
            <template v-else>
                <app-notification 
                    v-for="(notification, index) in notifications" 
                    :key="index" 
                    :data="notification"
                    v-if="notifications.length"
                />

                <div class="alert alert-info text-center m0">Du har inga notifieringar än.</div>
            </template>
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
    }
}
</script>

