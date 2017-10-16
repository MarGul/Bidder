<template>
	<div class="project_service-component">
		<service-details :service="service" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import serviceDetails from '../../Services/ServiceDetails';

	export default {
		components: {
			serviceDetails
		},
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