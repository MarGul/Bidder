<template>
	<div class="bid_history-component">
		
		<h1 class="user-component-title">Budhistorik</h1>

		<template v-if="bidsFetched">
			<ul class="list-unstyled list-bids" v-if="bids.length > 0">
				<li v-for="bid in bids">
					<div class="bid-header">
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-7">
								<div class="bid-user history-padding">
									<a class="link">{{ bid.user.username }}</a>
									<span class="user-reviews">
										<app-ratings :rating="4.5" :total="8"></app-ratings>
									</span>
								</div>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-5 bid-head-right">
								<button class="btn-flat btn-info" @click.prevent="accept(bid)">Acceptera budet</button>
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
				Där finns inga bud för denna tjänsten.
			</div>
		</template>

		<div class="load-spinner text-center" v-else>
			<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>
	</div>
</template>

<script>
	import Bid from "../../includes/models/Bid";
	import Ratings from "../Includes/Ratings.vue";

	export default {
		components: {
			appRatings: Ratings
		},
		data() {
			return {
				bids: [],
				bidsFetched: false
			}
		},
		computed: {
			acceptBid() {
				// Logic for determine if we should show the "Accept Bid" button
			}
		},
		methods: {
			time(t) {
				return moment(t).format("LLL");
			},
			accept(bid) {
				Bid.setResource(`services/${bid.service_id}/bids/${bid.id}/accept`).post()
					.then(response => {

					})
					.catch(error => {

					});
			}
		},
		created() {
			// Fetch bids for the service.
			Bid.setId(this.$route.params.id).get()
				.then(response => {
					this.bids = response.bids;
					this.bidsFetched = true;
				})
				.catch(error => {

				});
		}
	}
</script>