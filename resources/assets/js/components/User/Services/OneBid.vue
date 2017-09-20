<template>
	<div class="one_bid-component">
		<section class="white-contentSection mb30">
			<header class="white-contentSection-header has-actions">
				<div class="header-content">
					<router-link :to="`/profile/${bid.user.username}`" class="is-link" v-text="bid.user.username"></router-link>
					<app-ratings :rating="bid.user.rating || 0" :showAvg="true"></app-ratings>
					<div class="gray-sub-text" v-text="time(bid.created_at)"></div>
				</div> 
				<div class="header-actions"> 
					<app-bid-accept-status :bid="bid"></app-bid-accept-status>
				</div>
			</header>
			<div class="gray-contentSection-content">
				<ul class="bid-details-list">
					<li>
						<div class="detail-item">Kan börja</div>
						<div class="detail-value" v-text="filters.date(bid.start)"></div>
					</li>
					<li>
						<div class="detail-item">Är klart</div>
						<div class="detail-value" v-text="filters.date(bid.end)"></div>
					</li>
					<li>
						<div class="detail-item">Antal timmar</div>
						<div class="detail-value" v-text="filters.commaSeparator(bid.hours)"></div>
					</li> 
					<li>
						<div class="detail-item">Pris</div>
						<div class="detail-value" v-text="filters.currency(bid.price)"></div>
					</li>
				</ul> 
			</div>
			<div class="white-contentSection-content" v-text="bid.description"></div>
		</section>
	</div>
</template>

<script>
	import appRatings from '../../Includes/Ratings';
	import appBidAcceptStatus from './BidAcceptStatus';

	export default {
		props: ['bid'],
		components: {
			appRatings,
			appBidAcceptStatus
		},
		methods: {
			time(date) {
				return moment(date).format('D MMM YYYY HH:mm');
			}
		}
	}
</script>