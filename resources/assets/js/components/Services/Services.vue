<template>
	<div class="services-component">
		
		<section class="white-contentSection service-filter">
			<div class="white-contentSection-content">
				<app-service-filter></app-service-filter>
			</div>
			<footer class="white-contentSection-footer">
				<button type="button" class="btn btn-primary full-width" :class="{processing}" :disabled="processing" @click="fetchServices(false, true)">
					Hitta Tjänster
				</button>
			</footer>
		</section>

		<div class="services mtb20">
			<template  v-if="servicesLoaded">
				<template v-if="services.length">
					<div class="row">
						<transition-group name="slide-out" mode="out-in">
							<div class="col-xs-12 col-sm-6" v-for="service in services" :key="service.id">
								<router-link :to="{name: 'serviceDetails', params: {id: service.id}}" class="no-underline">
									<app-service-multi 
										:service="service"
										@bidStop="removeService"
									></app-service-multi>
								</router-link>
							</div>
						</transition-group>
					</div>

					<div class="row" v-if="servicesCanLoadMore">
						<div class="col-xs-12">
							<div class="load-more text-center mt10">
								<button 
									type="button" 
									class="btn btn-default btn-transparent is-bold-italic" 
									:class="{'processing': servicesLoadingMore}"
									@click.prevent="fetchServices(true)">
										Hämta fler
									</button>
							</div>
						</div>
					</div>
				</template>

				<div class="alert alert-info mt20" v-else>
					Tyvärr finns det inga tjänster att visa just nu.
				</div>
			</template>
			
			<app-loading bg="gray" v-else></app-loading>
		</div>
	</div>
</template>

<script>
	import appServiceFilter from './ServiceFilter';
	import appServiceMulti from './ServiceMulti.vue';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			appServiceFilter,
			appServiceMulti,
		},
		data() {
			return {
				processing: false
			}
		},
		computed: {
			...mapGetters([
				'servicesLoaded',
				'servicesLoadingMore',
				'servicesCanLoadMore',
				'services'
			])
		},
		methods: {
			fetchServices(appending = false, processing = false) {
				this.processing = processing ? true : false;
				
				this.$store.dispatch('getServices', {appending})
					.then(success => { this.processing = false; })
			},
			removeService({id}) {
				this.$store.dispatch('removeService', {id});
			}
		},
		created() {
			if ( !this.servicesLoaded ) {
				this.fetchServices();
			}
		}
	}
</script>