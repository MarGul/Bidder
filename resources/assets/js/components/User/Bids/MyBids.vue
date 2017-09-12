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
								<svg-icon icon="arrowRight" :width="12" :height="12" fill="#97A9B5"></svg-icon>
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
	import svgIcon from "../../Includes/Icons";

	export default {
		components: {
			svgIcon
		},
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