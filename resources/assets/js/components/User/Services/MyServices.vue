<template>
	<div class="my_services-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina tjänster</h3>
			</header>
			<div class="white-contentSection-content">
				<ul class="items-list" v-if="fetched">
					<li class="gray-item clickable" v-for="service in services">
						<div class="item-content">
							<div class="item-header" v-text="service.title"></div>
							<div class="item-sub-data">
								<span class="mr5">{{ $store.getters.getCategoryById(service.category_id).name }}</span>&bull;
								<span class="ml5">{{ service.active ? 'Budgivning pågår' : 'Avslutad' }}</span>
							</div>
						</div>
						<div class="item-go-to">
							<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								 width="12px" height="12px" viewBox="0 0 306 306" style="enable-background:new 0 0 306 306;" xml:space="preserve">
								<g id="chevron-right">
									<polygon points="94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153" fill="#97A9B5" />
								</g>
							</svg>
						</div>
					</li>
				</ul>

				<app-loading v-else></app-loading>
			</div>
		</section>

	</div>
</template>

<script>
	export default {
		computed: {
			fetched() {
				return this.$store.getters.userServicesFetched;
			},
			services() {
				return this.$store.getters.userServices;
			}
		},
		methods: {
			bidEnds(service) {
				return moment(service.bid_stop).format('LLL');
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserServices');
			}
		}
	}
</script>