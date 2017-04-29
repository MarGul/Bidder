<template>
	<div class="my_services-component">
		
		<h1 class="user-component-title">Mina Tjänster</h1>

		<ul class="user-items-list" v-if="services.length > 0">
			<li v-for="service in services">
				<div class="item-content">
					{{ service.title }}
					<span class="item-link" v-if="service.active">
						&nbsp;&mdash;&nbsp;<router-link :to="`/services/${service.id}`">visa tjänst</router-link>
					</span>
				</div>
				<div class="item-actions">
					<button class="btn-flat btn-default show-bids">
						<i class="fa fa-gavel" aria-hidden="true" title="Visa bud"></i> Visa bud
					</button>
					<button class="btn-flat btn-default edit">
						<i class="fa fa-pencil" aria-hidden="true" title="Redigera"></i> Redigera
					</button>
				</div>
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
			services() {
				return this.$store.getters.userServices;
			}
		},
		created() {
			if ( !this.$store.getters.userServicesFetched ) {
				this.$store.dispatch('fetchUserServices');
			}
		}
	}
</script>