<template>
	<div class="my_services-component">
		
		<h1 class="user-component-title">Mina Tjänster</h1>

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
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserServices');
			}
		}
	}
</script>