<template>
	<div class="services-view">
		<app-hero>
			<h1 slot="title">Tjänster</h1>
			<p slot="left">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.
			</p>
			<img slot="right" src="mechanic.png" alt="">
		</app-hero>

		<div class="container">
			<div class="content">

				<section class="white-contentSection service-filter">
					<div class="white-contentSection-content">
						<app-services-filter></app-services-filter>
					</div>
					<footer class="white-contentSection-footer">
						<button type="button" class="btn btn-primary full-width" :class="{processing}" :disabled="processing" @click="fetchServices()">
							Hitta Tjänster
						</button>
					</footer>
				</section>

				<template v-if="fetched">
					
					<template v-if="services.length">
						<div class="services-list">
							<app-services-multi v-for="service in services" :key="service.id"
								:service="service"
								@ended=""
							></app-services-multi>
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
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appServicesFilter from '../components/Services/ServiceFilter';
	import appServicesMulti from '../components/Services/ServicesMulti';
	import Model from '../includes/Model';

	export default {
		components: {
			appServicesFilter,
			appServicesMulti
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
				data.regions = this.filterLocations.filter(loc => !loc.hasOwnProperty('region_id')).map(region => region.id);
				data.cities = this.filterLocations.filter(loc => loc.hasOwnProperty('region_id')).map(city => city.id);
				
				new Model('services').get(data)
					.then(response => {
						this.$store.commit('SET_SERVICES', appending ? this.services.concat(response.data.services.data) : response.data.services.data);
						this.$store.commit('SET_SERVICES_CAN_LOAD_MORE', response.data.services.next_page_url ? true : false);
						this.$store.commit('SET_SERVICES_FETCHED', true);
						this.loadingMore = false;
						this.processing = false;
					})
					.catch(error => { console.log(error); });
			}
		},
		created() {
			if ( !this.fetched ) {
				this.fetchServices(false);
			}
		}
	}
</script>