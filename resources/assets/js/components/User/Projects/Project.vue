<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<project-title :title="project.title" :default="`# ${project.id}`"></project-title>

			<message-board></message-board>
		</template>

		<div class="load-spinner text-center" v-else>
			<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>

	</div>
</template>

<script>
	import projectTitle from './ProjectTitle';
	import messageBoard from '../../Messages/MessageBoard';

	export default {
		components: {
			messageBoard,
			projectTitle
		},
		computed: {
			fetched() {
				return this.$store.getters.userProjectsFetched;
			},
			project() {
				return this.$store.getters.userProjectFocus;
			},
			service_user() {
				// Is the user the one who created the service?
				return this.project.service_user === this.$store.getters.authUser.id ? true : false;
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