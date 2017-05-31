<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<project-title :title="project.title" :default="`# ${project.id}`"></project-title>
			
			<component :is="panel" :project="project"></component>

			<message-board></message-board>
		</template>

		<app-loading v-else></app-loading>

	</div>
</template>

<script>
	import projectTitle from './ProjectTitle';
	import messageBoard from '../../Messages/MessageBoard';
	import projectAccept from './ProjectAccept';
	import projectStarted from './ProjectStarted';
	import projectCompleted from './ProjectCompleted';

	export default {
		components: {
			messageBoard,
			projectTitle,
			projectAccept,
			projectStarted,
			projectCompleted
		},
		computed: {
			fetched() {
				return this.$store.getters.userProjectsFetched;
			},
			project() {
				return this.$store.getters.userProjectFocus;
			},
			panel() {
				if ( this.project.completed ) {
					return 'projectCompleted';
				}

				return this.project.started ? 'projectStarted' : 'projectAccept';
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserProjects', {focusId: this.$route.params.id});
			}
		},
		destroyed() {
			this.$store.commit('SET_PROJECT_FOCUS', {project: null});
		}
	}
</script>