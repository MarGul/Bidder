<template>
	<div class="project_started-component">
		<div class="panel panel-success">
			<div class="panel-heading">
				<i class="fa fa-refresh" aria-hidden="true"></i> Projektet är i full gång!
			</div>
			<div class="panel-body">


				<div class="time-finish-container text-center">
					<div class="finish-text">Projektet avslutas om:</div>
					<app-timer :ends="project.finish" @ended="complete"></app-timer>
					<div class="finish-date" v-text="project.finish"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Model from "../../../includes/Model";
	import appTimer from "../../Includes/Timer";

	export default {
		components: {
			appTimer
		},
		computed: {
			project() {
				return this.$store.getters.userProjectFocus;
			}
		},
		methods: {
			complete() {
				new Model(`projects/${this.project.id}/complete`).put()
					.then(response => {
						// Update the acceptance in store for project in focus
						let project = this.$store.getters.userProjectFocus;
						project.completed = true;
						this.$store.commit('SET_PROJECT_FOCUS', {project});
						// Update the acceptance in store for the projects
						let projects = this.$store.getters.userProjects;
						for (let i = 0; i < projects.length; i++) {
							if ( projects[i].id === project.id ) {
								projects[i] = project;
								break;
							}
						}
						this.$store.commit('SET_PROJECTS', {projects});
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.finish-text {
		font-size: 16px;
	}

	.timer-component {
		font-size: 20px;
		font-weight: bold;
		margin: 5px 0;
	}

	.finish-date {
		font-style: italic;
		font-size: 13px;
	}
</style>