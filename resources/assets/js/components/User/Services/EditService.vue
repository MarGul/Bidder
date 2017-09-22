<template>
	<div class="edit_service-component">
		
		<div class="main-area-with-sidebar">
			<div class="main-area">
				<component :is="currentView" @changeView="changeView"></component>
			</div>
			<div class="main-area-sidebar">
				<app-service-bids @changeView="changeView"></app-service-bids>
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