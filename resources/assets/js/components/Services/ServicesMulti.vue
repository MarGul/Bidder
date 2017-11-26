<template>
	<div class="services-multi-container">
		<router-link :to="`/services/${service.id}`">
			<div class="white-contentSection">
				<div class="white-contentSection-content">
					<div class="services-multi-title" v-text="service.title"></div>
					<div class="services-multi-info">
						<div class="multi-info category">
							<i class="icon icon_list primary wh15 mr10 cursor-default"></i> {{ category }}
						</div>
						<div class="multi-info location">
							<i class="icon icon_map_pin primary wh15 mr10 cursor-default"></i> {{ location }}
						</div>
					</div>
				</div>
				<div class="white-contentSection-footer">
					<div class="services-multi-meta is-flex">
						<div class="meta-bidCount is-flex c_c mr15">
							<i class="icon icon_bid light-gray w14h16 mr10"></i> {{ bidCount }}
						</div>
						<div class="meta-commentCount is-flex c_c">
							<i class="icon icon_comment light-gray w14h16 mr10"></i> {{ commentCount }}
						</div>
					</div>
					<div class="services-multi-meta timer">
						Avslutas om 
						<app-timer
							:ends="service.bid_stop"
							@ended="bidStop"
						></app-timer>
					</div>
				</div>
			</div>
		</router-link>
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
				// Remove the service from storage
				this.$store.dispatch('removeService', {id: this.service.id});
			}
		}
	}
</script>