<template>
	<div class="project_phase-component">
		<component :is="phase" />
	</div>
</template>

<script>
	import projectAccept from './ProjectAccept';

	export default {
		components: {
			projectAccept
		},
		computed: {
			phase(){
				return 'projectAccept';
			}
		}
	}
</script>