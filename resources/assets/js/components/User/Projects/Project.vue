<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<project-title :title="project.title" :default="`# ${project.id}`"></project-title>
			
			<project-accept :project="project"></project-accept>

			<message-board></message-board>
		</template>

		<app-loading v-else></app-loading>

	</div>
</template>

<script>
	import projectTitle from './ProjectTitle';
	import messageBoard from '../../Messages/MessageBoard';
	import projectAccept from './ProjectAccept';

	export default {
		components: {
			messageBoard,
			projectTitle,
			projectAccept
		},
		computed: {
			fetched() {
				return this.$store.getters.userProjectsFetched;
			},
			project() {
				return this.$store.getters.userProjectFocus;
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