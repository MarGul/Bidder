<template>
	<div class="show_reviews-component">

		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>{{ username }}'s omdömmen</h3>
				<div class="review-ratings gray-text">
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
		props: {
			username: {
				type: String,
				required: true
			},
			rating: {
				type: Object,
				required: true
			},
			reviews: {
				type: Array,
				required: true
			}

		},
		components: {
			appRatings,
			appReview
		},
		computed: {
			avg() {
				return this.rating.avg ? parseFloat(this.rating.avg) : 0.0;
			},
			count() {
				return this.rating.count ? parseFloat(this.rating.count) : 0;
			},
			communication() {
				return this.rating.communication ? parseFloat(this.rating.communication) : 0.0;
			},
			as_described() {
				return this.rating.as_described ? parseFloat(this.rating.as_described) : 0.0;
			}
		}
	}
</script>