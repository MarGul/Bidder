<template>
	<div class="service-container">
		<div class="service-img"></div>
		<div class="service-content">
			<div class="service-title">
				{{ service.title }}
			</div>
			<div class="service-bottom">
				<ul class="list-unstyled bottom-info">
					<li class="category">
						<i class="fa fa-list-ul" aria-hidden="true"></i> {{ category }}
					</li>
					<li class="location">
						<i class="fa fa-map-marker" aria-hidden="true"></i> {{ location }}
					</li>
				</ul>
				<ul class="list-unstyled bottom-meta">
					<li class="bid">
						<i class="fa fa-gavel" aria-hidden="true"></i> {{ bidCount }} bud
					</li>
					<li class="comments">
						<i class="fa fa-commenting" aria-hidden="true"></i> {{ commentCount }}
					</li>
					<li class="time">
						<app-timer 
							:ends="service.bid_stop"
							@ended="bidStop"
						></app-timer>
						kvar
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import appTimer from '../Includes/Timer';

	export default {
		props: ['service'],
		components: {
			appTimer
		},
		computed: {
			category() {
				return this.$store.getters.getCategoryById(this.service.category_id).name;
			},
			location() {
				let city = this.$store.getters.getCityById(this.service.city_id).name;
				let region = this.$store.getters.getRegionById(this.service.region_id).name;
				return `${city}, ${region}`
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