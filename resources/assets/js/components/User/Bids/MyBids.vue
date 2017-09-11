<template>
	<div class="my_bids-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina bud</h3>
			</header>
			<div class="white-contentSection-content">
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

<<<<<<< HEAD
		<template v-if="fetched">
			<ul class="user-items-list" v-if="bids.length > 0">
				<li v-for="bid in bids">
					<span class="item-content">
						<h5>{{ bid.description.substring(0, 75) }}</h5>
						<div class="item-content-details">
							<span class="mr5">Bud lagt den {{ bidDate(bid) }}</span>&bull;
							<span class="ml5 mr5">Budet är {{ bid.accepted ? 'accepterat' : 'ej accepterat' }}</span>&bull;
							<router-link :to="`/services/${bid.service_id}`" class="ml5">Visa tjänsten</router-link>
						</div>
					</span>
					<span class="item-actions">
						<router-link to="/test" class="btn btn-primary">Visa bud</router-link>
					</span>
				</li>
			</ul>
=======
					<div class="alert alert-info" v-else>
						Du har ännu inte lagt några bud.
					</div>
				</template>
>>>>>>> 8b2cc19206f3fdbcf59a5937844bffd1a5af489f

				<app-loading v-else></app-loading>
			</div>
		</section>

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
		methods: {
			bidDate(bid) {
				return moment(bid.created_at).format('LLL');
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserBids');
			}
		}
	}
</script>