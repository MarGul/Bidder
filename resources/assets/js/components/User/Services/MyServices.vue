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
							<i class="icon icon_arrow_right wh12"></i>
						</div>
					</li>
				</ul>

				<app-loading v-else></app-loading>
			</div>
		</section>

	</div>
</template>

<script>
	import Model from '../../../includes/Model';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			svgIcon
		},
		computed: {
			...mapGetters({
				fetched: 'userServicesFetched',
				services: 'userServices'
			})
		},
		methods: {
			goTo(service) {
				this.$router.push(`services/${service.id}`);
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('user/services').get()
					.then(response => {
						this.$store.commit('SET_USER_SERVICES_FETCHED', true);
						this.$store.commit('SET_USER_SERVICES', response.services);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>