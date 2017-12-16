<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<div class="main-area-with-sidebar">
				<div class="main-area">
					<router-view></router-view>
				</div>
				<div class="main-area-sidebar">
					<project-handle />
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
	import projectHandle from './ProjectHandle'; 
	import projectHistorySidebar from './ProjectHistorySidebar';

	export default {
		components: {
			projectHandle,
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
					this.$store.commit('SET_USER_PROJECT_DETAILS', response.data.project);
					this.$store.commit('SET_USER_PROJECT_DETAILS_FETCHED', true);
				})
				.catch(error => { console.log(error); });

			/*
			Echo.private(`project.${this.$route.params.id}`)
				.listen('DetailsUpdated', (e) => {
					this.$store.dispatch('projectDetailsUpdated', {project: e.project, history: e.history, usersNotAccepted: e.usersNotAccepted });
					this.$store.dispatch('eventNotification', {
						type: 'success', heading: 'Projektets detaljer uppdaterade!', text: 'Den andra parten har uppdaterat detaljerna för projektet.'
					});
				})
				.listen('CancelledProject', (e) => {
					this.$store.commit('SET_USER_PROJECTS_FETCHED', false);
					this.$store.dispatch('cancelProject', {userCancelledId: e.userCancelledId, history: e.history });
					this.$store.dispatch('eventNotification', {
						type: 'danger', heading: 'Projektet avbröts!', text: 'Den andra parten valde att avbryta projektet.'
					});
				});*/
		},
		destroyed() {
			this.$store.commit('SET_USER_PROJECT_DETAILS_FETCHED', false);
			this.$store.commit('SET_USER_PROJECT_DETAILS', {});
		}
	}
</script>