<template>
	<section class="white-contentSection">
		<header class="white-contentSection-header">
			<h3 class="service-title" v-text="service.title"></h3>
		</header>
		<div class="gray-contentSection-content">
			<div class="service-details">
				<div class="detail-item">
					<div class="detail-header">
						<i class="icon icon_list wh15 cursor-default primary mr10"></i><span>Kategori</span>
					</div>
					<div class="detail-value" v-text="category"></div>
				</div>
				<div class="detail-item">
					<div class="detail-header">
						<i class="icon icon_map_pin wh15 cursor-default primary mr10"></i><span>Plats</span>
					</div>
					<div class="detail-value" v-text="location"></div>
				</div>
			</div>
		</div>
		<div class="white-contentSection-content service-description" v-text="service.description"></div>
	</section>
</template>

<script>
	import serviceMedia from './ServiceMedia';

	export default {
		components: {
			serviceMedia
		},
		props: {
			service: {
				type: Object,
				required: true
			}
		},
		computed: {
			category() {
				let category = this.$store.getters.categoryById(this.service.category_id);
				return category ? category.name : '';
			},
			location() {
				let city = this.$store.getters.cityById(this.service.city_id);
				let region = this.$store.getters.regionById(this.service.region_id);
				return region && city ? `${city.name}, ${region.name}` : '';
			}
		}
	}
</script>