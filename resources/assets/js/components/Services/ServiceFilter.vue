<template>
	<div class="service_filter-component">
		<div class="filter-container filter-text">
			<label class="control-label">Fritext</label>
			<input type="text" id="filter_text" class="form-control" v-model="filterText">
		</div>
		<div class="filter-container filter-category">
			<label class="control-label">Kategorier</label>
			<app-tags-input 
				:items="categories"
				:options="allCategories"
				@add="addCategory" 
				@remove="removeCategory"
			></app-tags-input>
		</div>
		<div class="filter-container filter-locations">
			<label class="control-label">Platser</label>
			<app-tags-input 
				:items="locations"
				:options="allLocations"
				@add="addLocation"
				@remove="removeLocation"
			></app-tags-input>
		</div>
	</div>
</template>

<script>
	import appTagsInput from '../Includes/TagsInput';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			appTagsInput
		},
		computed: {
			filterText: {
				get() { return this.$store.getters.getFilterText; },
				set(value) { this.$store.commit('SET_FILTER_TEXT', value); }
			},
			...mapGetters({
				categories: 'filterCategories',
				allCategories: 'categoriesFlattened',
				locations: 'filterLocations',
				allLocations: 'getRegionsFlatten'
			})
		},
		methods: {
			addCategory(item) {
				let categories = this.categories;
				categories.push(item);
				this.$store.commit('SET_FILTER_CATEGORIES', categories);
			},
			removeCategory({index}) {
				let categories = this.categories;
				categories.splice(index, 1);
				this.$store.commit('SET_FILTER_CATEGORIES', categories);
			},
			addLocation(item) {
				let locations = this.locations;
				locations.push(item);
				this.$store.commit('SET_FILTER_LOCATIONS', locations);
			},
			removeLocation({index}) {
				let locations = this.locations;
				locations.splice(index, 1);
				this.$store.commit('SET_FILTER_LOCATIONS', locations);
			}
		}
	}
</script>