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
					<ul class="items-list mtb20" v-if="subscriptions.length > 0">
						<li class="white-item ptb10lr15" v-for="subscription in subscriptions">
							<div class="item-content">
								<div class="item-header" v-text="title(subscription)"></div>
							</div>
							<div class="item-go-to">
								<i class="icon icon_delete wh12 danger" @click="remove(subscription.id)"></i>
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
	import { mapGetters } from 'vuex';

	export default {
		components: {
			appAddSubscription
		},
		computed: {
			...mapGetters({
				fetched: 'subscriptionsFetched',
				subscriptions: 'subscriptions'
			})
		},
		methods: {
			remove(id) {
				new Model(`subscriptions/${id}`).delete()
					.then(response => {
						let subscriptions = this.subscriptions;
						subscriptions.forEach(function(sub, key) {
							if (id == sub.id) {
								subscriptions.splice(key, 1);
								return;
							}
						});
						this.$store.commit('SET_SUBSCRIPTIONS', subscriptions);
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Prenumerationen är borttagen.'});
					})
					.catch(error => { console.log(error); });
			},
			title(sub) {
				let isRegion = sub.region_id ? true : false;
				let locationId = isRegion ? sub.region_id : sub.city_id;
				let location = isRegion ? this.$store.getters.regionById(locationId) : this.$store.getters.cityById(locationId);
				let category = this.$store.getters.categoryById(sub.category_id);

				return `${category.name} i ${location.name}`;
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('subscriptions').get()
					.then(response => {
						this.$store.commit('SET_SUBSCRIPTIONS_FETCHED', true);
						this.$store.commit('SET_SUBSCRIPTIONS', response.data.subscriptions);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>