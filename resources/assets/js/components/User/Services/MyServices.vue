<template>
	<div class="my_services-component">
		
		<h1 class="user-component-title">Mina Tjänster</h1>

		<ul class="user-items-list" v-if="fetched">
			<li v-for="service in services">
				<div class="item-content">
					<h5>{{ service.title }}</h5>
					<span class="item-link" v-if="service.active">
						&nbsp;&mdash;&nbsp;<router-link :to="`/services/${service.id}`">visa tjänst</router-link>
					</span>
					<div class="item-content-details">
						<span class="mr5">{{ service.active ? 'Budgivning aktiv' : 'Budgivning avslutad' }}</span>&bull;
						<span class="ml5">
							Budgivning {{ service.bid_accepted ? 'avslutades' : 'avslutas' }} den {{ bidEnds(service) }}
						</span>
					</div>
				</div>
				<div class="item-actions">
					<router-link :to="`/user/service/${service.id}/edit`" class="is-link is-weight-500 mr10">Redigera</router-link>
					<router-link :to="`/user/service/${service.id}/bids`" class="btn btn-primary">Visa bud</router-link>
				</div>
			</li>
		</ul>

		<app-loading v-else></app-loading>

	</div>
</template>

<script>
	export default {
		computed: {
			fetched() {
				return this.$store.getters.userServicesFetched;
			},
			services() {
				return this.$store.getters.userServices;
			}
		},
		methods: {
			bidEnds(service) {
				return moment(service.bid_stop).format('LLL');
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserServices');
			}
		}
	}
</script>