<template>
	<div class="review">
		<div class="reviewer text-center" v-if="review.reviewer">
			<div class="reviewer-avatar" :style="avatar(review.reviewer.avatar)"></div>
			<div class="reviewed-by mt5">Omdömme av</div>
			<div class="reviewer-username is-weight-500">
				<router-link :to="`/profile/${review.reviewer.username.toLowerCase()}`" v-text="review.reviewer.username"></router-link>
			</div>
		</div>
		<div class="review-text">
			<div class="review-text-header">
				<app-ratings :rating="review.would_recommend" :showCount="false"></app-ratings>
				<div class="reviewed-at" v-text="reviewedAt"></div>
			</div>
			<div class="review-text-body" v-text="review.review"></div>
		</div>
	</div>
</template>

<script>
	import appRatings from '../Includes/Ratings';
	import { HeartBeat } from '../../includes/heartbeat'

	export default {
		props: ['review'],
		components: {
			appRatings
		},
		data() {
			return {
				reviewedAt: null
			}
		},
		methods: {
			avatar(avatar) {
				return {backgroundImage: `url(${avatar})`};
			}
		},
		created() {
			this.reviewedAt = moment(this.review.created_at).fromNow();
			HeartBeat.$on('beat', () => {
				this.reviewedAt = moment(this.review.created_at).fromNow();
			});
		}
	}
</script>