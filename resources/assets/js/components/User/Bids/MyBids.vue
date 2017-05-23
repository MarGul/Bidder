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

		<app-loading v-else></app-loading>

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