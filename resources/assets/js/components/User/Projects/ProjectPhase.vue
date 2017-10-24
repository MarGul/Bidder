<template>
	<div class="project_phase-component">
		<component :is="phase" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import projectPhaseAccept from './ProjectPhaseAccept';
	import projectPhaseCancelled from './ProjectPhaseCancelled';

	export default {
		components: {
			projectPhaseAccept,
			projectPhaseCancelled
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			}),
			phase(){
				if ( this.project.cancelled ) return 'projectPhaseCancelled';

				return 'projectPhaseAccept';
			}
		}
	}
</script>