<template>
	<div class="services-component">
		<div class="service-filter-container">
			<div class="row">
				<div class="col-xs-12 col-md-4 column">
					<label>Fritext</label>
					<input type="text" id="filter_text" class="form-control" v-model="filterText">
				</div>
				<div class="col-xs-12 col-md-4 column">
					<label>Kategorier</label>
					<app-tags-input 
						:items="categories"
						:options="allCategories"
						@add="categoryAdd" 
						@remove="categoryRemove"
					></app-tags-input>
				</div>
				<div class="col-xs-12 col-md-4 column">
					<label>Platser</label>
					<app-tags-input 
						:items="locations"
						:options="allLocations"
						@add="locationAdd"
						@remove="locationRemove"
					></app-tags-input>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-primary full-width" @click="getServices(false)">Hitta Tjänster</button>
				</div>
			</div>
		</div>

		<div class="services margin-25">
			<!-- v-for loop through the services with a component -->
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
		</div>
	</div>
</template>

<script>
	import appTagsInput from '../Includes/TagsInput';
	import appServiceMulti from './ServiceMulti.vue';
	import Model from '../../includes/Model';

	export default {
		props: {
			categories: { type: Array, default: () => [] },
			regions: { type: Array, default: () => [] },
			cities: { type: Array, default: () => [] }
		},
		components: {
			appTagsInput,
			appServiceMulti,
		},
		data() {
			return {
				filterText: '',
				fetched: false,
				services: [],
				page: 1
			}
		},
		computed: {
			locations() {
				return this.regions.concat(this.cities);
			},
			allCategories() {
				return this.$store.getters.getCategoriesFlatten;
			},
			allLocations() {
				return this.$store.getters.getRegionsFlatten;
			}
		},
		methods: {
			categoryAdd(item) {
				this.categories.push(item);
			},
			categoryRemove({index}) {
				this.categories.splice(index, 1);
			},
			locationAdd(item) {
				(item.type == 'region') ? this.regions.push(item) : this.cities.push(item);
			},
			locationRemove({item}) {
				let target = (item.type == 'region') ? this.regions : this.cities;
				let index = target.findIndex(el => el.value == item.value);
				if (index != -1) target.splice(index, 1);
			},
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
			this.getServices();
		}
	}
</script>