<template>
	<div class="service_description-component">
		<h4 class="title" v-text="service.title"></h4>
		<div class="info">
			<div class="info-item info-category">
				<i aria-hidden="true" class="fa fa-list-ul"></i> 
				Kategori: <span class="info-item-value" v-text="category"></span>
			</div>
			<div class="info-item info-location">
				<i aria-hidden="true" class="fa fa-map-marker"></i> 
				Plats: <span class="info-item-value" v-text="location"></span>
			</div>
		</div>
		<div class="description" v-text="service.description"></div>
	</div>
</template>

<script>
	export default {
		computed: {
			service() {
				return this.$store.getters.getService;
			},
			category() {
				let category = this.$store.getters.getCategoryById(this.service.category_id);
				return category.name;
			},
			location() {
				let city = this.$store.getters.getCityById(this.service.city_id);
				let region = this.$store.getters.getRegionById(this.service.region_id);
				return `${city.name}, ${region.name}`;
			}
		}
	}
</script>