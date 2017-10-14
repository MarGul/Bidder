<template>
	<div class="project_service-component">
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			}),
			service() {
				return this.project.service;
			}
		}
	}
</script>