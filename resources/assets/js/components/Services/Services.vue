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
					<button type="button" class="btn btn-primary full-width">Hitta Tjänster</button>
				</div>
			</div>
		</div>

		<div class="services">
			<!-- v-for loop through the services with a component -->
		</div>
	</div>
</template>

<script>
	import TagsInput from '../Includes/TagsInput.vue';

	export default {
		props: {
			categories: { type: Array, default: () => [] },
			regions: { type: Array, default: () => [] },
			cities: { type: Array, default: () => [] }
		},
		components: {
			appTagsInput: TagsInput
		},
		data() {
			return {
				filterText: '',
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
			}
		}
	}
</script>