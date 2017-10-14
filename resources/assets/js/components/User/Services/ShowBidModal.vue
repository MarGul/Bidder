<template>
	<div class="show_user_bid-component pt30">
		
		<one-bid :bid="bid" :hasAccept="true" />

	</div>
</template>

<script>
	import oneBid from '../Bids/OneBid';

	export default {
		components: {
			oneBid
		},
		computed: {
			bid() {
				return this.$store.getters.modalData.bid;
			}
		}
	}
</script>