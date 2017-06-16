<template>
	<div class="services-component">
		
		<app-service-filter></app-service-filter>

		<!--
		<div class="services mtb20">
			<div class="row" v-if="fetched">
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
			
			<app-loading bg="gray" v-else></app-loading>
		</div>-->
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
				services: [],
				page: 1
			}
		},
		methods: {
			getServices(append) {
				this.services = (append) ? this.services : [];
				new Model('services').get({
					page: this.page,
					text: this.filterText, 
					categories: this.categories.map(el => el.value),
					regions: this.regions.map(el => el.value),
					cities: this.cities.map(el => el.value)
				})
				.then(({services}) => {
					this.services = this.services.concat(services);
					this.fetched = true;
				})
				.catch(error => {
					console.log(error);
				});
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
			//this.getServices();
		}
	}
</script>