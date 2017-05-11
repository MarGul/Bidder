<template>
	<div class="message-component" :class="{me, theirs: !me}">
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
		props: ['message'],
		data() {
			return {
				time: null
			}
		},
		computed: {
			me() {
				return this.message.user.id === this.$store.getters.authUser.id ? true : false;
			},
			image() {
				let image = this.me ? this.$store.getters.authUser.avatar : this.message.user.avatar;
				return { backgroundImage: `url(${image})` };
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