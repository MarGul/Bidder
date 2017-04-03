<template>
	<div class="service_description-component">
		<div class="waiting" v-if="!$store.getters.getServiceLoaded">
			<span class="processing">
				<i class="fa fa-spinner fa-pulse fa-fw fa-4x"></i>
				<span class="sr-only">Loading...</span>
			</span>
		</div>
		<template v-else>
			<div class="title" v-text="title"></div>
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
			<div class="description" v-text="description"></div>
		</template>
	</div>
</template>

<script>
	export default {
		computed: {
			title() { return this.$store.getters.getServiceTitle; },
			description() { return this.$store.getters.getServiceDescription; },
			category() { return this.$store.getters.getServiceCategoryName; },
			location() { return `${this.$store.getters.getServiceCityName}, ${this.$store.getters.getServiceRegionName}`; }
		}
	}
</script>