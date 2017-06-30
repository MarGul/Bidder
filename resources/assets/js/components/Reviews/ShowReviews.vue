<template>
	<div class="show_reviews-component">
		
		<div class="rating-container">
			<h4 class="review-username">{{ username }}'s omdömmen</h4>
			<div class="review-ratings">
				<app-ratings :rating="avg" :total="count" :showAvg="true" size="large" ></app-ratings>
			</div>
		</div>
		<div class="ratings-details-container">
			<div class="detail-container text-center">
				<div class="detail-heading">Kommunikation</div>
				<app-ratings :rating="communication" :showCount="false"></app-ratings>
			</div>
			<div class="detail-container text-center">
				<div class="detail-heading">Som avtalat</div>
				<app-ratings :rating="as_described" :showCount="false"></app-ratings>
			</div>
			<div class="detail-container text-center">
				<div class="detail-heading">Skulle rekommendera</div>
				<app-ratings :rating="avg" :showCount="false"></app-ratings>
			</div>
		</div>
	
	</div>
</template>

<script>
	import appRatings from '../Includes/Ratings';

	export default {
		props: ['username', 'rating', 'reviews'],
		components: {
			appRatings
		},
		computed: {
			avg() {
				return this.rating ? this.rating.avg : 0.0;
			},
			count() {
				return this.rating ? this.rating.count : 0;
			},
			communication() {
				return this.rating ? this.rating.communication : 0.0;
			},
			as_described() {
				return this.rating ? this.rating.as_described : 0.0;
			}
		}
	}
</script>