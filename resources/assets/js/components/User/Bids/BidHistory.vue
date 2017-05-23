<template>
	<div class="bid_history-component">
		
		<h1 class="user-component-title">Budhistorik</h1>

		<template v-if="fetched">
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
								<button class="btn-flat btn-info" @click.prevent="focus = bid.id" v-if="!accepted" :disabled="processing">
									Acceptera budet
								</button>
								<div class="accepted-bid" v-if="accepted && bid.accepted">
									<i class="fa fa-check" aria-hidden="true"></i> Accepterat bud
								</div>
								<div class="bid-time" v-text="time(bid.created_at)"></div>
							</div>
							<div class="col-xs-12" v-if="!accepted && focus == bid.id">
								<div class="alert alert-warning bid-accept-confirm">
									När du accepterar ett bud kommer budgivningen för tjänsten att stoppas.
									<div class="confirm-buttons text-center">
										<button class="btn btn-success btn-flat" @click.prevent="accept(bid)" :disabled="processing">
											Acceptera
											<span class="processing" v-if="processing">
												<i class="fa fa-spinner fa-pulse fa-fw"></i>
												<span class="sr-only">Loading...</span>
											</span>
										</button>
										<button class="btn btn-danger btn-flat" @click.prevent="focus = ''">Avbryt</button>
									</div>
								</div>
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

		<app-loading v-else></app-loading>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";
	import appRatings from "../../Includes/Ratings";

	export default {
		components: {
			appRatings
		},
		data() {
			return {
				bids: [],
				fetched: false,
				accepted: false,
				focus: '',
				processing: false
			}
		},
		methods: {
			time(t) {
				return moment(t).format("LLL");
			},
			accept(bid) {
				this.processing = true;
				new Model(`services/${bid.service_id}/bids/${bid.id}/accept`).post()
					.then(response => {
						this.accepted = true;
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Woohoo! Budet var accepterat. Vi har skapat ett nytt projekt åt dig som du hittar under "Mina projekt".'
						});
						$("html, body").animate({ scrollTop: 0 }, "fast");
						bid.accepted = true;
						// Set the projects fetched to false so we break the cache.
						this.$store.commit('SET_PROJECTS_FETCHED', {fetched: false});
						this.processing = false;
					})
					.catch(error => {
						console.log(error);
					});
			}
		},
		created() {
			// Fetch bids for the service.
			new Model('services/{id}/bids').setId(this.$route.params.id).get()
				.then(response => {
					this.bids = response.bids;
					this.accepted = !!response.meta.bid_accepted;
					this.fetched = true;
				})
				.catch(error => {

				});
		}
	}
</script>