<template>
    <div class="one-notification" :class="{'not-read': !data.read_at}" @click="go">
        <div class="notification-image">
            <img :src="data.image" />
        </div>
        <div class="notification-body">
            <div class="notification-text" v-text="data.text" />
            <div class="gray-sub-text" v-text="time" />
        </div>
    </div>
</template>

<script>
import { HeartBeat } from '../../includes/heartbeat';

export default {
    props: {
        data: {
            type: Object
        }
    },
    data() {
        return {
            time: moment(this.data.created_at).fromNow()
        }
    },
    methods: {
        go() {
            this.$router.push(this.data.link);
        }
    },
    created() {
        HeartBeat.$on('beat', () => {
            this.time = moment(this.data.created_at).fromNow();
        });
    }
}
</script>
