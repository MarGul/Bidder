<template>
    <div class="notifications_component">
        <div class="main-area-with-sidebar">
            <div class="main-area">
                <section class="white-contentSection">
                    <header class="white-contentSection-header has-link">
                        <h3>Notifieringar</h3>
                        <a class="is-link" @click="markRead">Markera alla som lästa</a>
                    </header>
                    <div class="white-contentSection-content">
                        <app-loading v-if="!fetched" />

                        <app-notification 
                            v-for="(notification, index) in notifications" 
                            :key="index" 
                            :data="Object.assign(notification.data, {read_at: notification.read_at, created_at: notification.created_at})"
                            v-else-if="fetched && notifications.length > 0"
                        />
                        
                        <div class="alert alert-info text-center m0" v-else>Du har inga notifieringar än.</div>
                    </div>
                </section>
            </div>
            <div class="main-area-sidebar">
                <app-notification-settings />
            </div>
        </div>
    </div>
</template>

<script>
    import appNotificationSettings from './NotificationSettings';
    import { mapGetters } from 'vuex';
    import appNotification from '../../Includes/OneNotification';

    export default {
        components: {
            appNotificationSettings,
            appNotification
        },
        computed: {
            ...mapGetters({
                fetched: 'userNotificationsFetched',
                notifications: 'userNotifications'
            })
        },
        methods: {
            markRead(){
                this.$store.dispatch('markNotificationsAsRead');
            }
        },
        created() {
            if ( !this.fetched ) this.$store.dispatch('getNotifications');
        }
    }
</script>

