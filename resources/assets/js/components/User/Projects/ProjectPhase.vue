<template>
	<div class="project_phase-component">
		<component :is="phase" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import projectPhaseAccept from './ProjectPhaseAccept';
	import projectPhaseCancelled from './ProjectPhaseCancelled';
	import projectPhaseRunning from './ProjectPhaseRunning';
	import projectPhaseComplete from './ProjectPhaseComplete';

	export default {
		components: {
			projectPhaseAccept,
			projectPhaseCancelled,
			projectPhaseRunning,
			projectPhaseComplete
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			}),
			phase(){
				if ( this.project.cancelled ) return 'projectPhaseCancelled';

				if ( this.project.completed ) return 'projectPhaseComplete';

				if ( this.project.started ) return 'projectPhaseRunning';

				return 'projectPhaseAccept';
			}
		}
	}
</script>