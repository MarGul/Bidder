<template>
	<div class="project_accept-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Lär känna varandra!</h3>
			</header>
			<div class="white-contentSection-content">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum magnam vitae eveniet blanditiis accusamus a amet, numquam quaerat impedit, illo, maiores, quos ab natus. Ex totam impedit at, neque nam.
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