<template>
	<div class="services-component">
		
		<div class="service-filter-container">
			<app-service-filter></app-service-filter>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-primary full-width" @click="fetchServices">Hitta Tjänster</button>
				</div>
			</div>
		</div>

		<div class="services mtb20">
			<template  v-if="fetched">
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

				<div class="row" v-if="canLoadMore">
					<div class="col-xs-12">
						<div class="load-more text-center mt10">
							<button type="button" class="btn btn-default btn-transparent is-italic" :class="{'processing': loadingMore}">Hämta fler</button>
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
	import Model from '../../includes/Model';

	export default {
		components: {
			appServiceFilter,
			appServiceMulti,
		},
		data() {
			return {
				fetched: false,
				canLoadMore: false,
				loadingMore: false,
				page: 1,
				services: []
			}
		},
		methods: {
			fetchServices() {
				let data = {page: this.page};
				if ( this.$store.getters.getFilterText ) data.text = this.$store.getters.getFilterText;
				if ( this.$store.getters.getFilterCategories.length > 0 ) data.categories = this.$store.getters.getFilterCategories.map(cat => cat.value).join();
				if ( this.$store.getters.getFilterRegions.length > 0 ) data.regions = this.$store.getters.getFilterRegions.map(reg => reg.value).join();
				if ( this.$store.getters.getFilterCities.length > 0 ) data.cities = this.$store.getters.getFilterCities.map(cit => cit.value).join();

				new Model('services').get(data)
					.then(({services}) => {
						this.canLoadMore = services.next_page_url ? true : false;
						this.services = this.services.concat(services.data);
						this.fetched = true;
					})
					.catch(error => { console.log(error); });
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
			this.fetchServices();
		}
	}
</script>