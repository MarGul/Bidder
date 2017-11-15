<template>
	<div class="services-component">
		
		<section class="white-contentSection service-filter">
			<div class="white-contentSection-content">
				<app-service-filter></app-service-filter>
			</div>
			<footer class="white-contentSection-footer">
				<button type="button" class="btn btn-primary full-width" :class="{processing}" :disabled="processing" @click="fetchServices()">
					Hitta Tjänster
				</button>
			</footer>
		</section>
		
		<template  v-if="fetched">
			<template v-if="services.length">
				<div class="services-list mtb20">
					<transition-group name="slide-out" mode="out-in">
						<div class="service-multi-container" v-for="service in services" :key="service.id">
							<router-link :to="{name: 'serviceDetails', params: {id: service.id}}" class="no-underline">
								<app-service-multi 
									:service="service"
									@bidStop="removeService"
								></app-service-multi>
							</router-link>
						</div>
					</transition-group>
				</div>

				<div class="is-relative" v-if="canLoadMore">
					<div class="load-more text-center mt15">
						<button 
							type="button" 
							class="btn btn-default btn-transparent is-bold-italic" 
							:class="{'processing': loadingMore}"
							@click.prevent="fetchServices(false, true)">
							Hämta fler
						</button>
					</div>
				</div>
			</template>

			<div class="alert alert-info mt20" v-else>
				Tyvärr finns det inga tjänster att visa just nu.
			</div>
		</template>
		
		<app-loading bg="gray" v-else></app-loading>
	</div>
</template>

<script>
	import appServiceFilter from './ServiceFilter';
	import appServiceMulti from './ServiceMulti.vue';
	import { mapGetters } from 'vuex';
	import Model from '../../includes/Model';

	export default {
		components: {
			appServiceFilter,
			appServiceMulti,
		},
		data() {
			return {
				processing: false,
				loadingMore: false
			}
		},
		computed: {
			...mapGetters({
				fetched: 'servicesFetched',
				page: 'servicesPage',
				canLoadMore: 'servicesCanLoadMore',
				services: 'services',
				filterText: 'filterText',
				filterCategories: 'filterCategories',
				filterLocations: 'filterLocations'
			})
		},
		methods: {
			fetchServices(processing = true, appending = false) {
				this.processing = processing ? true : false;
				// Are we appending to the list?
				if ( appending ) {
					this.$store.commit('SET_SERVICES_PAGE', this.page + 1);
					this.loadingMore = true;
				}

				// The filtering of services
				let data = {};
				data.page = this.page
				data.text = this.filterText;
				data.categories = this.filterCategories.map(cat => cat.value);
				data.regions = this.filterLocations.filter(loc => loc.type === 'region').map(region => region.value);
				data.cities = this.filterLocations.filter(loc => loc.type === 'city').map(city => city.value);
				
				new Model('services').get(data)
					.then(response => {
						this.$store.commit('SET_SERVICES', appending ? this.services.concat(response.data.services.data) : response.data.services.data);
						this.$store.commit('SET_SERVICES_CAN_LOAD_MORE', response.data.services.next_page_url ? true : false);
						this.$store.commit('SET_SERVICES_FETCHED', true);
						this.loadingMore = false;
						this.processing = false;
					})
					.catch(error => { console.log(error); });
			},
			removeService({id}) {
				let services = this.services;
				let serviceIndex = services.findIndex(e => e.id === id);
				if ( serviceIndex !== -1 ) {
					services.splice(serviceIndex, 1);
				}
				this.$store.commit('SET_SERVICES', services);
			}
		},
		created() {
			if ( !this.fetched ) {
				this.fetchServices(false);
			}
		}
	}
</script>