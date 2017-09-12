<template>
	<div class="my_projects-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina projekt</h3>
			</header>
			<div class="white-contentSection-content">
				<template v-if="fetched">
					<ul class="items-list" v-if="projects.length > 0">
						<li class="gray-item clickable" v-for="project in projects" @click="show(project)">
							<div class="item-content">
								<div class="item-header" v-text="project.title || `#${project.id}`"></div>
								<div class="item-sub-data">
									<span class="mr5">Projektet skapades den {{ projectCreated(project) }}</span>&bull;
									<span class="ml5 is-weight-500">{{ project.completed ? 'Avslutat' : 'Pågår' }}</span>
								</div>
							</div>
							<div class="item-go-to">
								<svg-icon icon="arrowRight" :width="12" :height="12" fill="#97A9B5"></svg-icon>
							</div>
						</li>
					</ul>

					<div class="alert alert-info" v-else>
						Du har ännu inga skapade projekt.
					</div>
					
				</template>

				<app-loading v-else></app-loading>
			</div>
		</section>

	</div>
</template>

<script>
	import svgIcon from "../../Includes/Icons";

	export default {
		components: {
			svgIcon
		},
		computed: {
			fetched() {
				return this.$store.getters.userProjectsFetched;
			},
			projects() {
				return this.$store.getters.userProjects;
			}
		},
		methods: {
			show(project) {
				this.$store.commit('SET_PROJECT_FOCUS', {project});
				this.$router.push(`/user/project/${project.id}`);
			},
			projectCreated(project) {
				return moment(project.created_at).format('LLL');
			},
			projectFinish(project) {
				return moment(project.finish).format('LL');
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserProjects');
			}
		}
	}
</script>