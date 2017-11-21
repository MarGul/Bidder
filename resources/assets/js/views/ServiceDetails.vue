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
		computed: {
			...mapGetters({
				fetched: 'serviceFetched'
			})
		},
		created() {
			new Model(`services/${this.$route.params.id}`).get()
				.then(response => {
					this.$store.commit('SET_SERVICE_DETAILS_FETCHED', true);
					this.$store.commit('SET_SERVICE_DETAILS', response.data.service);
				})
				.catch(error => {

				});


			Echo.channel('service.' + this.$route.params.id)
				.listen('CommentCreated', (e) => {
					this.$store.commit('ADD_COMMENT', {comment: e.comment});
				})
				.listen('NewBid', (e) => {
					this.$store.dispatch('addBid', {bid: e.bid});
					this.$store.dispatch('showNotification', {type: 'info', msg: 'Det kom precis in ett bud för denna tjänsten!'})
				});
		},
		destroyed() {
			this.$store.commit('SET_SERVICE_DETAILS_FETCHED', false);
			this.$store.commit('SET_SERVICE_DETAILS', {});
		}
	}
</script>