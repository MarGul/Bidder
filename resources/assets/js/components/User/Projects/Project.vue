<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<div class="main-area-with-sidebar">
				<div class="main-area">
					main
				</div>
				<div class="main-area-sidebar">
					<project-history :history="project.history" />
				</div>
			</div>
		</template>

		<app-loading v-else />

	</div>
</template>

<script>
	import projectTitle from './ProjectTitle';
	import messageBoard from '../../Messages/MessageBoard';
	import projectAccept from './ProjectAccept';
	import projectStarted from './ProjectStarted';
	import projectCompleted from './ProjectCompleted';
	
	import { mapGetters } from 'vuex';
	import Model from '../../../includes/Model';
	import projectHistory from './ProjectHistory';

	export default {
		components: {
			messageBoard,
			projectTitle,
			projectAccept,
			projectStarted,
			projectCompleted,

			projectHistory
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
					this.$store.commit('SET_USER_PROJECT_DETAILS_FETCHED', true);
					this.$store.commit('SET_USER_PROJECT_DETAILS', response.project);
				})
				.catch(error => { console.log(error); });
		},
		destroyed() {
			//this.$store.commit('SET_PROJECT_FOCUS', {project: null});
		}
	}
</script>