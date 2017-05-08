<template>
	<div class="my_bids-component">
		
		<h1 class="user-component-title">Mina Bud</h1>

		<template v-if="fetched">
			<ul class="user-items-list" v-if="bids.length > 0">
				<li v-for="bid in bids">
					<span class="item-content">
						{{ bid.description }}
					</span>
					<span class="item-actions">
						
					</span>
				</li>
			</ul>

			<div class="alert alert-info" v-else>
				Du har ännu inte lagt några bud.
			</div>
		</template>

		<div class="load-spinner text-center" v-else>
			<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>

	</div>
</template>

<script>
	export default {
		computed: {
			fetched() {
				return this.$store.getters.userBidsFetched;
			},
			bids() {
				return this.$store.getters.userBids;
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserBids');
			}
		}
	}
</script>