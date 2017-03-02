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
			<div class="row">
				<div class="col-xs-12 col-sm-6" v-for="service in services">
					<app-service 
						:service="service"
						:timeNow="timeNow"
						@bidStop=""
					></app-service>
				</div>
			</div>
			
			<div class="load-spinner text-center" v-if="loading">
				<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script>
	import TagsInput from '../Includes/TagsInput.vue';
	import Services from '../../includes/models/Services';
	import Service from './Service.vue';

	export default {
		props: {
			categories: { type: Array, default: () => [] },
			regions: { type: Array, default: () => [] },
			cities: { type: Array, default: () => [] }
		},
		components: {
			appTagsInput: TagsInput,
			appService: Service
		},
		data() {
			return {
				timer: null,
				timeNow: 1,
				filterText: '',
				loading: false,
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
				this.loading = true;
				this.services = (append) ? this.services : [];
				Services.get({
					page: this.page,
					text: this.filterText, 
					categories: this.categories.map(el => el.value),
					regions: this.regions.map(el => el.value),
					cities: this.cities.map(el => el.value)
				})
				.then(({services}) => {
					this.services = this.services.concat(services);
					this.loading = false;
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		mounted() {
			this.getServices();
			this.timer = setInterval(() => {
				this.timeNow++;
			}, 1000);
		}
	}
</script>