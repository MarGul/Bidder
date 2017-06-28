<template>
	<div class="show_reviews-component">
		
		<div class="rating-container">
			<h4 class="review-username">{{ username }}'s omdömmen</h4>
			<div class="review-ratings">
				<app-ratings :rating="rating.avg" :total="rating.count" :showAvg="true" size="large" ></app-ratings>
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
		}
	}
</script>