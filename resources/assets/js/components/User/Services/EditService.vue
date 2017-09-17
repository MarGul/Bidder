<template>
	<div class="edit_service-component">
		
		<div class="row">
			<div class="col-xs-12 col-md-8 col-lg-9">
				<component :is="currentView" @changeView="changeView"></component>
			</div>
			<div class="col-xs-12 col-md-4 col-lg-3">
				<div class="row">
					<div class="col-xs-12">
						<app-service-bids @changeView="changeView"></app-service-bids>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import appEditServiceForm from "./EditServiceForm";
	import appViewAllBids from "./ViewAllBids";
	import appServiceBids from "./ServiceBids";

	export default {
		components: {
			appEditServiceForm,
			appViewAllBids,
			appServiceBids
		},
		data() {
			return {
				currentView: 'appEditServiceForm'
			}
		},
		methods: {
			changeView({view}) {
				this.currentView = view;
			}
		},
		destroyed() {
			this.$store.dispatch('clearServiceDetailsState');
		}
	}
</script>