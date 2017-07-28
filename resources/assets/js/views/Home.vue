<template>
	<div class="home-view">

		<app-home-hero></app-home-hero>

		<app-home-features></app-home-features>
			
	</div>
</template>

<script>
	import appHomeHero from "../components/Home/HomeHero"; 
	import appHomeFeatures from "../components/Home/HomeFeatures"; 

	export default {
		components: {
			appHomeHero,
			appHomeFeatures
		}	
	}
</script>