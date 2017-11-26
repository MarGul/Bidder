<template>
	<div class="bid_details-component">
		
		<div class="main-area-with-sidebar">
			<div class="main-area">
				<template v-if="fetched">
					<one-bid :bid="bid" :mine="true" />
				</template>
				<app-loading v-else />
			</div>
			<div class="main-area-sidebar">
				<app-bid-service :service="bid.service" v-if="fetched"></app-bid-service>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../../includes/Model';
	import oneBid from '../../Bids/OneBid';
	import appBidService from './BidService';

	export default {
		components: {
			oneBid,
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
						this.$store.commit('SET_USER_BID_DETAILS', response.data.bid);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>