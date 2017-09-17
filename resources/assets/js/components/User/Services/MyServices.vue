<template>
	<div class="my_services-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina tjänster</h3>
			</header>
			<div class="white-contentSection-content">
				<ul class="items-list" v-if="fetched">
					<li class="gray-item clickable" v-for="service in services" @click="goTo(service)">
						<div class="item-content">
							<div class="item-header" v-text="service.title"></div>
							<div class="item-sub-data">
								<span class="mr5">{{ $store.getters.getCategoryById(service.category_id).name }}</span>&bull;
								<span class="ml5">{{ service.active ? 'Budgivning pågår' : 'Avslutad' }}</span>
							</div>
						</div>
						<div class="item-go-to">
							<svg-icon icon="arrowRight" :width="12" :height="12" fill="#97A9B5"></svg-icon>
						</div>
					</li>
				</ul>

				<app-loading v-else></app-loading>
			</div>
		</section>

	</div>
</template>

<script>
	import svgIcon from "../../Includes/Icons";

	export default {
		components: {
			svgIcon
		},
		computed: {
			fetched() {
				return this.$store.getters.userServicesFetched;
			},
			services() {
				return this.$store.getters.userServices;
			}
		},
		methods: {
			goTo(service) {
				this.$router.push(`services/${service.id}`);
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserServices');
			}
		}
	}
</script>