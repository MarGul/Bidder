<template>
    <div class="project-users-action-container">
        <div class="action-part project-user user-me">
            <div class="user-username" v-text="me.username"></div>
            <div class="user-avatar" :style="{'background-image': `url(${me.avatar})`}"></div>
            <div class="action-status-container">
                <slot name="me-status"></slot>
            </div>
        </div>
        <div class="action-part action-type-container">
            <slot name="action-type-container"></slot>
        </div>
        <div class="action-part project-user user-other">
            <div class="user-username" v-text="other.username"></div>
            <div class="user-avatar" :style="{'background-image': `url(${other.avatar})`}"></div>
            <div class="action-status-container">
                <slot name="other-status"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            me: {
                type: Object,
                required: true
            },
            other: {
                type: Object,
                required: true
            }
        }
    }
</script>
