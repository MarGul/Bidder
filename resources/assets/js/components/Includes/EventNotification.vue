<template>
    <div class="event_notification-component" :class="[typeOfEvent]">
        <div class="event-icon"></div>
        <div class="event-content">
            <div class="event-heading" v-text="headingOfEvent"></div>
            <div class="event-text" v-text="textOfEvent"></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                typeOfEvent: 'eventNotificationType',
                headingOfEvent: 'eventNotificationHeading',
                textOfEvent: 'eventNotificationText'
            })
        },
        created() {
            setTimeout(() => {
				this.$store.dispatch('closeEventNotification');
			}, 5000)
        }
    }
</script>
