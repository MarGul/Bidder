<template>
	<div class="services-component">
		
		<div class="service-filter-container">
			<app-service-filter></app-service-filter>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-primary full-width" :class="{processing}" :disabled="processing" @click="fetchServices(false, true)">
						Hitta Tjänster
					</button>
				</div>
			</div>
		</div>

		<div class="services mtb20">
			<template  v-if="servicesLoaded">
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
				console.log(processing);
				this.processing = processing ? true : false;
				console.log(this.processing);
				
				this.$store.dispatch('getServices', {appending})
					.then(success => { this.processing = false; })
			},
			removeService({id}) {
				let sleep = function(ms) {
					return new Promise(resolve => setTimeout(resolve, ms));
				}
				sleep(Math.random() * 10).then(() => {
					this.services.splice(this.services.findIndex(e => e.id == id), 1)
				});
			}
		},
		created() {
			if ( !this.servicesLoaded ) {
				this.fetchServices();
			}

			Echo.channel('services')
				.listen('NewService', (e) => {

				});
		}
	}
</script>