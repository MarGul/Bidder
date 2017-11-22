<template>
	<div class="services-multi-container">
		<div class="white-contentSection">
			<div class="white-contentSection-content">
				<div class="services-multi-title" v-text="service.title"></div>
			</div>
			<div class="white-contentSection-footer">
				<div class="services-multi-meta bidCount">
					<i class="icon icon_bid light-gray wh12"></i> {{ bidCount }}
				</div>
				<div class="services-multi-meta commentCount">
					<i class="icon icon_bid light-gray wh12"></i> {{ commentCount }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import appTimer from '../Includes/Timer';

	export default {
		props: {
			service: {
				type: Object,
				required: true
			}
		},
		components: {
			appTimer
		},
		computed: {
			category() {
				let category = this.$store.getters.categoryById(this.service.category_id)
				return category ? category.name : '';
			},
			location() {
				let city = this.$store.getters.cityById(this.service.city_id);
				let region = this.$store.getters.regionById(this.service.region_id);
				return city && region ? `${city.name}, ${region.name}` : '';
			},
			commentCount() {
				return this.service.comment_count ? this.service.comment_count.count : 0;
			},
			bidCount() {
				return this.service.bid_count ? this.service.bid_count.count : 0;
			}
		},
		methods: {
			bidStop() {
				// Emit an event to bidStop so that the Services component can remove the service from the list.
				this.$emit('bidStop', {id: this.service.id});
			}
		}
	}
</script>