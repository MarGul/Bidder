<template>
	<div class="service_filter-component">
		<div class="filter-container filter-text">
			<input type="text" id="filter_text" class="form-control" v-model="filterText" placeholder="Sök tjänster">
		</div>
		<div class="filter-container filter-category">
			<app-multi-select 
				placeholder="Kategorier"
				:items="categories"
				multiKey="sub_categories"
				@changed="categoriesChanged"
			/>
		</div>
		<div class="filter-container filter-locations">
			<app-multi-select 
				placeholder="Platser"
				:items="regions"
				multiKey="cities"
				@changed="citiesChanged"
			/>
		</div>
		<div class="filter-search-btn">
			<button type="button" class="btn btn-primary is-flex c_c" @click="$emit('search')">
				<i class="icon h_search wh20 white mr15"></i> Sök
			</button>
		</div>
	</div>
</template>

<script>
	import appMultiSelect from '../InputControls/MultiSelect';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			appMultiSelect
		},
		computed: {
			filterText: {
				get() { return this.$store.getters.filterText; },
				set(value) { this.$store.commit('SET_FILTER_TEXT', value); }
			},
			...mapGetters({
				categories: 'categories',
				regions: 'regions'
			})
		},
		methods: {
			categoriesChanged({items}) {
				this.$store.commit('SET_FILTER_CATEGORIES', items);
			},
			citiesChanged({items}) {
				this.$store.commit('SET_FILTER_CITIES', items);
			}
		}
	}
</script>