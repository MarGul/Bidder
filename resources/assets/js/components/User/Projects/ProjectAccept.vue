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
				<project-change-details />
			</div>
			<div class="white-contentSection-content">
				Accept status
			</div>
		</section>
	</div>
</template>

<script>
	import projectChangeDetails from './ProjectChangeDetails';

	export default {
		components: {
			projectChangeDetails
		}
	}
</script>