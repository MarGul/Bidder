<template>
	<div class="message-component" :class="[containerClass]">
		<div class="left">
			<div class="user-image" :style="image"></div>
		</div>
		<div class="right">
			<div class="user-name">
				<div class="name" v-if="me">Jag</div>
				<router-link :to="`/profile/${message.user.username}`" v-text="message.user.username" v-else></router-link>
			</div>
			<div class="user-message" v-text="message.message"></div>
			<div class="message-time" v-text="time"></div>
		</div>
	</div>
</template>

<script>
	import { HeartBeat } from "../../includes/heartbeat";

	export default {
		props: {
			message: {
				type: Object,
				required: true
			},
			me: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
				time: null
			}
		},
		computed: {
			image() {
				return { backgroundImage: `url(${this.message.user.avatar})` };
			},
			containerClass() {
				return this.me ? 'me' : '';
			}
		},
		created() {
			this.time = moment(this.message.created_at).fromNow();
			HeartBeat.$on('beat', () => {
				this.time = moment(this.message.created_at).fromNow();
			});
		}
	}
</script>