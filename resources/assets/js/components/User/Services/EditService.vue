<template>
	<div class="edit_service-component">
		
		<div class="row">
			<div class="col-xs-12 col-md-8 col-lg-9">
				<component :is="currentView" :bids="bids"></component>
			</div>
			<div class="col-xs-12 col-md-4 col-lg-3">
				<div class="row">
					<div class="col-xs-12">
						<app-service-bids @showAllBids="showAllBids"></app-service-bids>
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
				currentView: 'appEditServiceForm',
				bids: []
			}
		},
		methods: {
			showAllBids({bids}) {
				this.currentView = 'appViewAllBids';
				this.bids = bids;
			}
		}
	}
</script>