<template>
	<div class="comment-component">
		<div class="comment-avatar" :style="{'background-image': avatar}"></div>
		<div class="comment-content">
			<div class="comment-head">
				<span class="comment-author">
					<router-link 
						:to="`/profile/${comment.user.username}`" 
						class="is-link"
						v-text="comment.user.username">
					</router-link>
				</span>
				<span class="comment-time" v-text="time"></span>
			</div>
			<div class="comment-body" v-text="comment.body"></div>
		</div>
	</div>
</template>

<script>
	import { HeartBeat } from '../../includes/heartbeat';

	export default {
		props: {
			comment: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				time: moment(this.comment.updated_at).fromNow()
			}
		},
		computed: {
			avatar() {
				return `url('${this.comment.user.avatar}')`;
			}
		},
		created() {
			HeartBeat.$on('beat', () => {
				this.time = moment(this.comment.updated_at).fromNow();
			});
		}
	}
</script>