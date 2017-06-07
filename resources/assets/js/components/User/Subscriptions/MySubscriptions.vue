<template>
	<div class="my_subscriptions-component">
		
		<h1 class="user-component-title">Prenumerationer</h1>

		<app-add-subscription></app-add-subscription>

		<ul class="user-items-list" v-if="fetched">
			<li v-for="subscription in subscriptions">
				<div class="item-content">
					Test
				</div>
				<div class="item-actions">
					Radera
				</div>
			</li>
		</ul>

		<app-loading v-else></app-loading>
	</div>
</template>

<script>
	import appAddSubscription from "./AddSubscription";

	export default {
		components: {
			appAddSubscription
		},
		computed: {
			fetched() {
				return this.$store.getters.userSubscriptionsFetched;
			},
			subscriptions() {
				return this.$store.getters.userSubscriptions;
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserSubscriptions');
			}
		}
	}
</script>