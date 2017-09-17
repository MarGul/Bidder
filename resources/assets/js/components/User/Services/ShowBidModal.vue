<template>
	<div class="show_user_bid-component pt30">
		
		<app-one-bid :bid="bid"></app-one-bid> 

	</div>
</template>

<script>
	import appOneBid from './OneBid';

	export default {
		components: {
			appOneBid
		},
		computed: {
			bid() {
				return this.$store.getters.modalData.bid;
			}
		}
	}
</script>