<template>
	<div class="bid_accept_status-component">
		<template v-if="!bidAccepted">
			<button class="btn btn-primary" @click="openAcceptBidModal">
				Acceptera budet
			</button>
		</template>
		<div class="accepted-bid-container" v-if="bidAccepted && bid.accepted">
			<i class="confirm-icon"></i><span class="bid-accepted">Accepterat bud</span>
		</div>
	</div>
</template>

<script>
	import Model from '../../../includes/Model';

	export default {
		props: ['bid'],
		computed: {
			bidAccepted() {
				return this.$store.getters.serviceDetailsBidAccepted;
			}
		},
		methods: {
			openAcceptBidModal() {
				this.$store.dispatch('openModal', {
					component: 'confirm',
					data: {
						confirmText: 'Är du säker på att du vill acceptera budet?',
						onConfirm: () => {
							new Model(`bids/${this.bid.id}/accept`).post()
								.then(response => {
									this.$store.dispatch('showNotification', {
										type: 'success', 
										msg: 'Woohoo! Budet var accepterat. Vi har skapat ett nytt projekt åt dig som du hittar under "Mina projekt".'
									});
									// Set the projects fetched to false so we break the cache.
									this.$store.commit('SET_PROJECTS_FETCHED', {fetched: false});
									this.$store.dispatch('bidAccepted', {id: this.bid.id});
									this.$store.dispatch('closeModal');
								})
								.catch(error => {
									console.log(error);
								});
						}
					}
				});
			}
		}
	}
</script>