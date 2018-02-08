<template>
    <div class="one-notification" :class="{'not-read': !data.read_at}" @click="go">
        <div class="notification-image">
            <img :src="data.image" />
        </div>
        <div class="notification-body">
            <div class="notification-text" v-text="data.text" />
            <div class="gray-sub-text" v-text="filters.time(data.created_at)" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        go() {
            this.$router.push(this.data.link);
        }
    }
}
</script>
