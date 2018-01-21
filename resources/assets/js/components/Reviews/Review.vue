<template>
	<div class="review">
		<div class="review-user">
			<div class="reviewer-avatar" :style="avatar(review.reviewer.avatar)"></div>
			<div class="reviewed-at gray-sub-text mt10 text-center">Omdömme av</div>
			<div class="reviewer-username text-center mt5">
				<router-link 
					:to="`/profile/${review.reviewer.username.toLowerCase()}`" 
					v-text="review.reviewer.username" 
					class="is-link"
				/>
			</div>
		</div>
		<div class="review-body">
			<div class="review-body-header">
				<app-ratings :rating="parseFloat(review.would_recommend)" :showCount="false"></app-ratings>
				<div class="reviewed-at gray-sub-text" v-text="reviewedAt"></div>
			</div>
			<div class="review-body-review" v-text="review.review"></div>
		</div>
	</div>
</template>

<script>
	import appRatings from '../Includes/Ratings';
	import { HeartBeat } from '../../includes/heartbeat'

	export default {
		props: {
			review: {
				type: Object,
				required: true
			}	
		},
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