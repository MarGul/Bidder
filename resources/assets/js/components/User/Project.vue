<template>
	<div class="project-component">
		
		<h1 class="user-component-title"></h1>

	</div>
</template>

<script>
	export default {
		computed: {
			project() {
				return this.$store.getters.userProjectFocus;
			}
		},
		created() {
			if ( $.isEmptyObject(this.$store.getters.userProjectFocus) ) {
				this.$store.dispatch('fetchUserProjects', {focusId: this.$route.params.id});
			}
		},
		destroyed() {
			this.$store.commit('SET_PROJECT_FOCUS', {project: null});
		}
	}
</script>