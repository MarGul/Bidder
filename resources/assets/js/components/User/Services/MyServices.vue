<template>
	<div class="my_services-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina tjänster</h3>
			</header>
			<div class="white-contentSection-content">
				<ul class="user-items-list" v-if="fetched">
					<li v-for="service in services">
						<div class="item-content">
							{{ service.title }}
							<span class="item-link" v-if="service.active">
								&nbsp;&mdash;&nbsp;<router-link :to="`/services/${service.id}`">visa tjänst</router-link>
							</span>
						</div>
						<div class="item-actions">
							<router-link :to="`/user/service/${service.id}/bids`" class="btn-flat btn-default show-bids">
								<i class="fa fa-gavel" aria-hidden="true" title="Visa bud"></i> Visa bud
							</router-link>
							<router-link :to="`/user/service/${service.id}/edit`" class="btn-flat btn-default edit">
								<i class="fa fa-pencil" aria-hidden="true" title="Redigera"></i> Redigera
							</router-link>
						</div>
					</li>
				</ul>

<<<<<<< HEAD
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
=======
				<app-loading v-else></app-loading>
			</div>
		</section>
>>>>>>> 8b2cc19206f3fdbcf59a5937844bffd1a5af489f

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