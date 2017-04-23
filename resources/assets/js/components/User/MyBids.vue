<template>
	<div class="my_bids-component">
		
		<h1 class="user-component-title">Mina Bud</h1>

		<ul class="user-items-list" v-if="bids.length > 0">
			<li v-for="bid in bids">
				<span class="item-content">
					{{ bid.description }}
				</span>
				<span class="item-actions">
					
				</span>
			</li>
		</ul>

		<div class="load-spinner text-center" v-else>
			<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>

	</div>
</template>

<script>
	export default {
		computed: {
			bids() {
				return this.$store.getters.userBids;
			}
		},
		created() {
			if ( !this.$store.getters.userBidsFetched ) {
				this.$store.dispatch('fetchUserBids');
			}
		}
	}
</script>