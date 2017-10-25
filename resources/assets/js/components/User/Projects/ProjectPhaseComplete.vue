<template>
	<div class="project_phase_complete-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Projektet är färdigt!</h3>
			</header>
			<div class="white-contentSection-content">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius cum excepturi animi tempora expedita, nemo saepe laudantium. Id harum, suscipit deserunt praesentium reiciendis recusandae officiis eaque, quaerat illo minima temporibus!
			</div>
			<div class="gray-contentSection-content">
				<app-leave-review />
			</div>
		</section>
	</div>
</template>

<script>
	import appLeaveReview from "../../Reviews/LeaveReview";

	export default {
		components: {
			appLeaveReview
		}
	}
</script>