<template>
	<div class="project_phase-component">
		<component :is="phase" />
	</div>
</template>

<script>
	import projectPhaseAccept from './ProjectPhaseAccept';

	export default {
		components: {
			projectPhaseAccept
		},
		computed: {
			phase(){
				return 'projectPhaseAccept';
			}
		}
	}
</script>