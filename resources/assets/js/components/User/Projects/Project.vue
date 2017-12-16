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

			Echo.private(`project.${this.$route.params.id}`)
                .listen('UseContract', (e) => {
					this.$store.dispatch('useContract', {history: e.history, usersNotAccepted: e.usersNotAccepted });
					this.$store.dispatch('eventNotification', {
						type: 'success', heading: 'Använda avtal!', text: 'Den andra parten vill använda ett avtal för projektet.'
					});
                })
                .listen('RemoveContract', (e) => {
                    
                })
				.listen('DetailsUpdated', (e) => {

				})
				.listen('AcceptedProject', (e) => {

				})
				.listen('DecliedProject', (e) => {

				});
		},
		destroyed() {
			this.$store.commit('SET_USER_PROJECT_DETAILS_FETCHED', false);
			this.$store.commit('SET_USER_PROJECT_DETAILS', {});
		}
	}
</script>