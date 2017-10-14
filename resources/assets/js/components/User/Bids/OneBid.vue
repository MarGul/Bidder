<template>
	<div class="one_bid-component">
		<section class="white-contentSection mb30">
			<header class="white-contentSection-header has-actions">
				<div class="header-content">
					<template v-if="mine">
						<div class="gray-text">Budet skapades den {{ filters.time(bid.created_at) }}</div>
						<div class="header-actions" v-if="bid.accepted">
							<i class="icon icon_confirmed wh20 mr5"></i><span class="bid-accepted">Accepterat bud</span>
						</div>
					</template>
					<template v-else>
						<router-link :to="`/profile/${bid.user.username}`" class="is-link" v-text="bid.user.username"></router-link>
						<app-ratings :rating="bid.user.rating || 0" :showAvg="true"></app-ratings>
						<div class="gray-sub-text" v-text="filters.time(bid.created_at)"></div>
					</template>
				</div> 
				<div class="header-actions" v-if="hasAccept && !mine"> 
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
	import appBidAcceptStatus from '../Services/BidAcceptStatus';

	export default {
		props: {
			bid: {
				type: Object,
				required: true
			},
			mine: {
				type: Boolean,
				default: false
			},
			hasAccept: {
				type: Boolean,
				default: false
			}
		},
		components: {
			appRatings,
			appBidAcceptStatus
		}
	}
</script>