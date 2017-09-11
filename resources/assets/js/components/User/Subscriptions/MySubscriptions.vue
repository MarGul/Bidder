<template>
	<div class="my_subscriptions-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Prenumerationer</h3>
			</header>
			<div class="gray-contentSection-content">
				<app-add-subscription></app-add-subscription>
			</div>
			<div class="white-contentSection-content">
				<template v-if="fetched">
					<ul class="user-items-list" v-if="subscriptions.length > 0">
						<li v-for="subscription in subscriptions">
							<div class="item-content">
								{{ title(subscription) }}
							</div>
							<div class="item-actions">
								<button type="button" class="btn btn-default" @click.prevent="remove(subscription.id)">
									<i class="fa fa-times" aria-hidden="true"></i> Ta bort
								</button>
							</div>
						</li>
					</ul>

					<div class="alert alert-info" v-else>Du har ännu inga prenumerationer. Skapa din första ovan.</div>
				</template>

				<app-loading v-else></app-loading>		
			</div>
		</section>

	</div>
</template>

<script>
	import appAddSubscription from "./AddSubscription";
	import Model from "../../../includes/Model";

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
		methods: {
			remove(id) {
				new Model(`subscriptions/${id}`).delete()
					.then(response => {
						let subscriptions = this.subscriptions;
						subscriptions.forEach(function(sub, key) {
							if (id == sub.id) {
								subscriptions.splice(key, 1);
							}
						});
						this.$store.commit('SET_SUBSCRIPTIONS', {subscriptions});
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Prenumerationen är borttagen.'});
					})
					.catch(error => { console.log(error); });
			},
			title(sub) {
				let isRegion = sub.region_id ? true : false;
				let locationId = isRegion ? sub.region_id : sub.city_id;
				let location = isRegion ? this.$store.getters.getRegionById(locationId) : this.$store.getters.getCityById(locationId);
				let category = this.$store.getters.getCategoryById(sub.category_id);

				return `${category.name} i ${location.name}`;
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserSubscriptions');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-actions {
		justify-content: flex-end;
	}
</style>