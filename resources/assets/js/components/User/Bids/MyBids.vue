<template>
	<div class="my_bids-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina bud</h3>
			</header>
			<div class="white-contentSection-content">
				<template v-if="fetched">
					<ul class="items-list">
						<li class="gray-item clickable" v-for="bid in bids">
							<div class="item-content">
								<div class="item-header" v-text="description(bid.description)"></div>
								<div class="item-sub-data">
									<span class="mr5">Bud lagt den {{ bidDate(bid) }}</span>&bull;
									<span class="ml5">Budet är {{ bid.accepted ? 'accepterat' : 'ej accepterat' }}</span>
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
				</template>


				<app-loading v-else></app-loading>
			</div>
		</section>

	</div>
</template>

<script>
	export default {
		computed: {
			fetched() {
				return this.$store.getters.userBidsFetched;
			},
			bids() {
				return this.$store.getters.userBids;
			}
		},
		methods: {
			description(desc) {
				return desc.length > 75 ? `${desc.substr(0, 75)}...` : desc;
			},
			bidDate(bid) {
				return moment(bid.created_at).format('LLL');
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserBids');
			}
		}
	}
</script>