<template>
	<div class="project_accept-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Lär känna varandra!</h3>
			</header>
			<div class="white-contentSection-content">
				<p>
					Välkommen till projektsidan. Här har ni möjlighet att skriva till varandra och diskutera de sista detaljerna i projektet. 
					Om ni vill så kan ni använda dig av vår avtalsmall för att säkerställa att arbetet slutförs precis så som ni vill ha det. 
				</p>
				<p>
					Projektet kommer att per automatik avslutas om 14 dagar om ni inte väljer att starta projektet. Ni kan välja att starta 
					projektet även innan dessa 14 dagar men även välja att avböja projektets start. 
				</p>
			</div>
			<div class="gray-contentSection-content">
				<project-use-contract />
			</div>
			<div class="gray-contentSection-content">
				<project-change-details />
			</div>
			<div class="white-contentSection-content">
				<project-accept />
			</div>
		</section>
	</div>
</template>

<script>
	import projectChangeDetails from './ProjectChangeDetails';
	import projectAccept from './ProjectAccept';
	import projectUseContract from './ProjectUseContract';

	export default {
		components: {
			projectChangeDetails,
			projectAccept,
			projectUseContract
		}
	}
</script>