<template>
	<div class="show_reviews-component">

		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>{{ username }}'s omdömmen</h3>
				<div class="review-ratings">
					<app-ratings :rating="avg" :total="count" :showAvg="true"></app-ratings>
				</div>
			</header>
			<div class="gray-contentSection-content">
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
			<div class="white-contentSection-content">
				<app-review :review="review" v-for="review in reviews" :key="review.id"></app-review>
			</div>
		</section>
	
	</div>
</template>

<script>
	import appRatings from '../Includes/Ratings';
	import appReview from './Review';

	export default {
		props: ['username', 'rating', 'reviews'],
		components: {
			appRatings,
			appReview
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