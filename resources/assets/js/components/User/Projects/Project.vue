<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<project-title :title="project.title" :default="`# ${project.id}`"></project-title>

			<info-accept :project="project" :me="me" :other="other"></info-accept>

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
	import infoAccept from './InfoAccept';

	export default {
		components: {
			messageBoard,
			projectTitle,
			infoAccept
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
				return this.project.service_user.id === this.$store.getters.authUser.id ? true : false;
			},
			me() {
				return this.service_user ? this.project.service_user : this.project.bid_user;
			},
			other() {
				return this.service_user ? this.project.bid_user : this.project.service_user
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