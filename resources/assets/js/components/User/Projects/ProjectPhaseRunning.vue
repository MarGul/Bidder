<template>
	<div class="project_phase_running-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Projektet är i full gång!</h3>
			</header>
			<div class="white-contentSection-content">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque laudantium ipsum, velit fugit ab iusto eius officia unde
				 accusamus, porro, omnis harum voluptatum dicta nisi error magnam voluptatem. Quae, vitae.
			</div>
			<div class="gray-contentSection-content">
				<app-project-user-actions :actionEnds="project.service_end" :actionEndsDisplayTime="false">
					<div class="gray-sub-text" slot="action-end-text">
						Slutförs om
					</div>
					<p slot="me-status">Jag</p>
					<p slot="other-status">den andre</p>

				</app-project-user-actions>

			</div>
		</section>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import appProjectUserActions from './ProjectUserActions';

	export default {
		components: {
			appProjectUserActions
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			})
		}
	}
</script>