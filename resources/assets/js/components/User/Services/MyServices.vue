<template>
	<div class="my_services-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina tjänster</h3>
			</header>
			<div class="white-contentSection-content">
				<template v-if="fetched">
					<ul class="items-list" v-if="services.length > 0">
						<li class="gray-item clickable" v-for="service in services" :key="service.id" @click="goTo(service)">
							<div class="item-content">
								<div class="item-header" v-text="service.title"></div>
								<div class="item-sub-data">
									<span class="mr5">{{ categoryName(service.category_id) }}</span>&bull;
									<span class="ml5">{{ service.active ? 'Budgivning pågår' : 'Avslutad' }}</span>
								</div>
							</div>
							<div class="item-go-to">
								<i class="icon h_cheveron_right wh15 light-gray"></i>
							</div>
						</li>
					</ul>

					<div class="alert alert-info" v-else>
						Du har inte skapat några tjänster än.
					</div>
				</template>

				<app-loading v-else></app-loading>
			</div>
		</section>

	</div>
</template>

<script>
	import Model from '../../../includes/Model';
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				fetched: 'userServicesFetched',
				services: 'userServices',
				categoryById: 'categoryById'
			})
		},
		methods: {
			categoryName(category_id) {
				let category = this.categoryById(category_id);
				return category ? category.name : '';
			},
			goTo(service) {
				this.$router.push(`services/${service.id}`);
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('user/services').get()
					.then(response => {
						this.$store.commit('SET_USER_SERVICES_FETCHED', true);
						this.$store.commit('SET_USER_SERVICES', response.data.services);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>