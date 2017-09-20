<template>
	<div class="bid_details-component">
		
		<div class="main-area-with-sidebar">
			<div class="main-area">
				<section class="white-contentSection">
					<template v-if="fetched">
						<header class="white-contentSection-header">
							<h3>fasfa</h3>
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
					</template>
					<app-loading v-else></app-loading>
				</section>
			</div>
			<div class="main-area-sidebar">
				<app-bid-service></app-bid-service>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../../includes/Model';
	import appBidService from './BidService';

	export default {
		components: {
			appBidService
		},
		computed: {
			...mapGetters({
				fetched: 'userBidDetailsFetched',
				bid: 'userBidDetails'
			})
		},
		created() {
			if ( !this.fetched ) {
				new Model(`user/bids/${this.$route.params.id}`).get()
					.then(response => {
						this.$store.commit('SET_USER_BID_DETAILS_FETCHED', true);
						this.$store.commit('SET_USER_BID_DETAILS', response.bid);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>