<template>
	<div class="show_bids-component">
		<div class="modal-header">
			<h3 class="text-center">Visar budhistorik</h3>
		</div>

		<div class="modal-body">
			<template v-if="loaded">
				<ul class="list-unstyled list-bids" v-if="bids.length > 0">
					<li v-for="bid in bids">
						<div class="bid-header">
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-7">
									<div class="bid-user">
										<a class="link">{{ bid.user.username }}</a>
										<span class="user-reviews">
											<app-ratings :rating="rating(bid)" :total="ratingCount(bid)"></app-ratings>
										</span>
									</div>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-5">
									<div class="bid-time" v-text="time(bid.created_at)"></div>
								</div>
							</div>
						</div>
						<div class="bid-info">
							<div class="row">
								<div class="col-xs-6 col-md-3 text-center info-section">
									<div class="info-head">Starta utförandet</div>
									<div class="info-value" v-text="bid.start"></div>
								</div>
								<div class="col-xs-6 col-md-3 text-center info-section">
									<div class="info-head">Avsluta utförandet</div>
									<div class="info-value" v-text="bid.end"></div>
								</div>
								<div class="col-xs-6 col-md-3 text-center info-section">
									<div class="info-head">Antal timmar</div>
									<div class="info-value" v-text="filters.commaSeparator(bid.hours)"></div>
								</div>
								<div class="col-xs-6 col-md-3 text-center info-section">
									<div class="info-head">Pris</div>
									<div class="info-value" v-text="filters.currency(bid.price)"></div>
								</div>
							</div>
						</div>
						<div class="bid-description" v-text="bid.description"></div>
					</li>
				</ul>

				<div class="alert alert-info text-center" v-else>
					Denna tjänsten har ännu inga lagda bud. Vill du bli den första? 
					<a class="link" @click.prevent="openCreateBid">Lägg ett bud nu</a>
				</div>
			</template>

			<app-loading v-else></app-loading>
		</div>

		<div class="modal-footer">
			<a class="link" @click.prevent="openCreateBid">Lägg ett bud för denna tjänsten</a>
		</div>
	</div>
</template>

<script>
	import appRatings from "../Includes/Ratings";

	export default {
		components: {
			appRatings
		},
		computed: {
			loaded() {
				return this.$store.getters.getBidsLoaded;
			},
			bids() {
				return this.$store.getters.getBids;
			}
		},
		methods: {
			rating(bid) {
				return bid.user.rating ? bid.user.rating.avg : 0;
			},
			ratingCount(bid) {
				return bid.user.rating ? bid.user.rating.count : 0;
			},
			openCreateBid() {
				this.$store.dispatch('openModal', { component: 'createBid', size: 'large'});
			},
			time(t) {
				return moment(t).format("LLL");
			}
		},
		created() {
			if ( !this.loaded ) {
				this.$store.dispatch('getBids');
			}
		}
	}
</script>