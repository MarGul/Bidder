<template>
	<div class="bid_service-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header">
				<h3>Tjänsten</h3>
			</header>
			<div class="transparent-contentSection-content">
				Yeah
			</div>
			<div class="transparent-contentSection-content">
				<button class="btn btn-danger full-width is-flex c_c" @click.prevent="remove">
					<i class="icon icon_danger wh20 mr10"></i> Ta bort budet
				</button>
			</div>
		</section>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";

	export default {
		props: ['service'],
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