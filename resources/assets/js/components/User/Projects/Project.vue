<template>
	<div class="project-component">
		
		<template v-if="fetched">
			<project-title :title="title" :default="`# ${project.id}`" @changed="titleUpdate"></project-title>

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
			},
			title() {
				return this.service_user ? this.project.service_user_title : this.project.bid_user_title;
			}
		},
		methods: {
			titleUpdate(data) {
				if ( data.title ) {
					// Update the projectFocus
					let project = this.project;
					if ( this.service_user ) {
						project.service_user_title = data.title;
					} else {
						project.bid_user_title = data.title;
					}
					this.$store.commit('SET_PROJECT_FOCUS', {project});
				}
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