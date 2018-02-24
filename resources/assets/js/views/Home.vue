<template>
	<div class="home-view">

		<app-home-hero />

		<app-create-service-steps />

		<app-bid-on-service-steps />

		<app-after-match-steps />
			
	</div>
</template>

<script>
	import appHomeHero from "../components/Home/HomeHero"; 
	import appCreateServiceSteps from "../components/Home/CreateServiceSteps"; 
	import appBidOnServiceSteps from "../components/Home/BidOnServiceSteps"; 
	import appAfterMatchSteps from "../components/Home/AfterMatchSteps"; 

	export default {
		components: {
			appHomeHero,
			appCreateServiceSteps,
			appBidOnServiceSteps,
			appAfterMatchSteps
		}	
	}
</script>