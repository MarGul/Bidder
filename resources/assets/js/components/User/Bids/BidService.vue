<template>
	<div class="bid_service-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header">
				<h3>Tjänsten</h3>
				<template v-if="fetched">
					<router-link :to="`/services/${service.id}`" class="is-link" v-if="service.active">
						Visa tjänsten
					</router-link>
				</template>
			</header>
			<template v-if="fetched">
				<div class="transparent-contentSection-content">
					<ul class="items-list-icon">
						<li class="">
							<div class="item-list-icon pt3">
								<i class="icon icon_document_check wh15 cursor-default"></i>
							</div>
							<div class="item-list-icon-content">
								<div>Titel</div>
								<div class="gray-sub-text" v-text="service.title"></div>
							</div>
						</li>
						<li class="">
							<div class="item-list-icon">
								<i class="icon icon_bid wh20 cursor-default"></i>
							</div>
							<div class="item-list-icon-content">
								<div>Budgivningen {{ statusText }}</div>
								<div class="gray-sub-text">{{ finishText }} {{ filters.time(service.bid_stop) }}</div>
							</div>
						</li>
					</ul>
					<button class="btn btn-danger full-width is-flex c_c" @click.prevent="remove">
						<i class="icon icon_danger wh20 mr10"></i> Ta bort budet
					</button>
				</div>
			</template>
		</section>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";

	export default {
		props: ['service'],
		computed: {
			fetched() {
				return this.$store.getters.userBidDetailsFetched;
			},
			statusText() {
				return this.service.active ? 'pågår' : ' är avslutad';
			},
			finishText() {
				return this.service.active ? 'Avslutas' : 'Avslutades';
			}
		},
		methods: {
			remove() {
				this.$store.dispatch('openModal', {
					component: 'confirm',
					data: {
						confirmText: 'Är du säker på att du vill ta bort budet?',
						onConfirm: () => {
							new Model(`user/bids/${this.$route.params.id}`).delete()
								.then(response => {
									this.$store.dispatch('showNotification', {
										type: 'success', 
										msg: 'Ditt bud är nu borttaget!'
									});
									// Set the projects fetched to false so we break the cache.
									this.$store.commit('SET_USER_BIDS_FETCHED', false);
									this.$router.push('/user/bids');
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