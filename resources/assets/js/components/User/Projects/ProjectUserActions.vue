<template>
    <div class="project-users-action-container">
        <div class="action-part project-user user-me">
            <div class="user-username" v-text="me.username"></div>
            <div class="user-avatar" :style="{'background-image': `url(${me.avatar})`}"></div>
            <div class="action-status-container">
                <slot name="me-status"></slot>
            </div>
        </div>
        <div class="action-part action-time-container">
            <slot name="action-end-text"></slot>
            <app-timer :ends="actionEnds" />
            <div class="gray-sub-text">den {{ timeEnds }}</div>
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
    import { mapGetters } from 'vuex';
    import appTimer from '../../Includes/Timer';

    export default {
        components: {
			appTimer
        },
        props: {
            actionEnds: {
                required: true
            },
            actionEndsDisplayTime: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        computed: {
            ...mapGetters({
                auth: 'authUser',
                project: 'userProjectDetails'
            }),
            me() {
				return this.project.users.find(u => u.id === this.auth.id);
			},
			other() {
				return this.project.users.find(u => u.id !== this.auth.id);
            },
            timeEnds() {
                return this.actionEndsDisplayTime ? this.filters.time(this.actionsEnds) : this.filters.date(this.actionEnds);
            }
        }
    }
</script>
