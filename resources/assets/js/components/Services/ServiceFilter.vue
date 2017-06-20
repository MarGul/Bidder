<template>
	<div class="service_filter-component">
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
					@add="addCategory" 
					@remove="removeCategory"
				></app-tags-input>
			</div>
			<div class="col-xs-12 col-md-4 column">
				<label>Platser</label>
				<app-tags-input 
					:items="locations"
					:options="allLocations"
					@add="addLocation"
					@remove="removeLocation"
				></app-tags-input>
			</div>
		</div>
	</div>
</template>

<script>
	import appTagsInput from '../Includes/TagsInput';

	export default {
		components: {
			appTagsInput
		},
		computed: {
			filterText: {
				get() { return this.$store.getters.getFilterText; },
				set(value) { this.$store.commit('SET_FILTER_TEXT', {text: value}); }
			},
			categories() {
				return this.$store.getters.getFilterCategories;
			},
			allCategories() {
				return this.$store.getters.getCategoriesFlatten;
			},
			locations() {
				return this.$store.getters.getFilterLocations;
			},
			allLocations() {
				return this.$store.getters.getRegionsFlatten;
			}
		},
		methods: {
			addCategory(item) {
				this.$store.dispatch('addFilterCategory', {category: item});
			},
			removeCategory({index}) {
				this.$store.dispatch('removeFilterCategory', {index});
			},
			addLocation(item) {
				this.$store.dispatch('addFilterLocation', {location: item})
			},
			removeLocation({item}) {
				this.$store.dispatch('removeFilterLocation', {location: item});
			}
		}
	}
</script>