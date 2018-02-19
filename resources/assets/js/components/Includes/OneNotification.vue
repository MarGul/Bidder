<template>
    <div class="one-notification" :class="{'not-read': !notification.read_at}" @click="go">
        <div class="notification-image">
            <img :src="notification.image" />
        </div>
        <div class="notification-body">
            <div class="notification-text" v-text="notification.text" />
            <div class="gray-sub-text" v-text="time" />
        </div>
    </div>
</template>

<script>
import { HeartBeat } from '../../includes/heartbeat';

export default {
    props: {
        notification: {
            type: Object
        }
    },
    data() {
        return {
            time: moment(this.notification.created_at).fromNow()
        }
    },
    methods: {
        go() {
            this.$store.dispatch('markNotificationAsRead', {id: this.notification.id});

            this.$router.push(this.notification.link);
        }
    },
    created() {
        HeartBeat.$on('beat', () => {
            this.time = moment(this.notification.created_at).fromNow();
        });
    }
}
</script>
