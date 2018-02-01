<template>
	<div class="service_details-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3 class="service-title" v-text="service.title"></h3>
			</header>
			<div class="gray-contentSection-content">
				<div class="service-details">
					<div class="detail-item">
						<div class="detail-header">
							<i class="icon h_items wh20 cursor-default primary mr10"></i><span>Kategori</span>
						</div>
						<div class="detail-value" v-text="category"></div>
					</div>
					<div class="detail-item">
						<div class="detail-header">
							<i class="icon h_flag wh20 cursor-default primary mr10"></i><span>Plats</span>
						</div>
						<div class="detail-value" v-text="location"></div>
					</div>
					<div class="detail-item">
						<div class="detail-header">
							<i class="icon h_calender wh20 cursor-default primary mr10"></i><span>Utförs mellan</span>
						</div>
						<div class="detail-value">
							 {{filters.date(service.start) }} <span class="gray-sub-text">&mdash;</span> {{ filters.date(service.end) }}
						</div>
					</div>
				</div>
			</div>
			<div class="white-contentSection-content service-description" v-text="service.description"></div>
		</section>
		<service-media :media="service.media" v-if="service.media.length > 0" />
	</div>
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