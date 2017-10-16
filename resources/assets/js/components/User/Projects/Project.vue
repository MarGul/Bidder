<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<div class="main-area-with-sidebar">
				<div class="main-area">
					<router-view></router-view>
				</div>
				<div class="main-area-sidebar">
					<project-details />
					<project-history-sidebar :history="project.history" />
				</div>
			</div>
		</template>

		<app-loading v-else />

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../../includes/Model';
	import projectDetails from './ProjectDetails'; 
	import projectHistorySidebar from './ProjectHistorySidebar';

	export default {
		components: {
			projectDetails,
			projectHistorySidebar
		},
		computed: {
			...mapGetters({
				fetched: 'userProjectDetailsFetched',
				project: 'userProjectDetails'
			})
		},
		created() {
			new Model(`user/projects/${this.$route.params.id}`).get()
				.then(response => {
					this.$store.commit('SET_USER_PROJECT_DETAILS', response.project);
					this.$store.commit('SET_USER_PROJECT_DETAILS_FETCHED', true);
				})
				.catch(error => { console.log(error); });
		},
		destroyed() {
			this.$store.commit('SET_USER_PROJECT_DETAILS_FETCHED', false);
			this.$store.commit('SET_USER_PROJECT_DETAILS', {});
		}
	}
</script>