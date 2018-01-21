<template>
	<div class="service_details-component">
		<div class="container">
			<div class="content">
				<template v-if="fetched">
					<router-view></router-view>
				</template>

				<app-loading bg="gray" v-else></app-loading>
			</div>
		</div>
	</div>
</template>

<script>
	import Model from '../includes/Model';
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				serviceId: null
			}
		},
		computed: {
			...mapGetters({
				fetched: 'serviceFetched'
			})
		},
		created() {
			this.serviceId = this.$route.params.id;
			new Model(`services/${this.serviceId}`).get()
				.then(response => {
					this.$store.commit('SET_SERVICE_DETAILS_FETCHED', true);
					this.$store.commit('SET_SERVICE_DETAILS', response.data.service);
				})
				.catch(error => {

				});

			Echo.channel('service.' + this.serviceId)
				.listen('CommentCreated', (e) => {
					console.log('listening');
					this.$store.dispatch('addComment', {comment: e.comment});
				})
				.listen('NewBid', (e) => {
					this.$store.dispatch('addBid', {bid: e.bid});
					this.$store.dispatch('eventNotification', {
						type: 'success', heading: 'Nytt bud!', text: 'Tjänsten fick precis ett nytt bud.'
					});
				});
		},
		destroyed() {
			// Leave the echo channel
			Echo.leave(`service.${this.serviceId}`);
			
			this.$store.commit('SET_SERVICE_DETAILS_FETCHED', false);
			this.$store.commit('SET_SERVICE_DETAILS', {});
		}
	}
</script>