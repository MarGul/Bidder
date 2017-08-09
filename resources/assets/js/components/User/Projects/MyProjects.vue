<template>
	<div class="my_projects-component">
		
		<h1 class="user-component-title">Mina projekt</h1>

		<template v-if="fetched">
			<ul class="user-items-list" v-if="projects.length > 0">
				<li v-for="project in projects">
					<span class="item-content">
						<h5 v-text="project.title || `# ${project.id}`"></h5>
						<div class="item-content-details">
							<span class="mr5">Skapades den {{ projectCreated(project) }}</span>&bull;
							<span class="ml5 mr5">Projektet {{ project.completed ? 'är avslutad' : 'pågår' }}</span>&bull;
							<span class="ml5">{{ project.completed ? 'Avslutades' : 'Avslutas' }} den {{ projectFinish(project) }}</span>
						</div>
					</span>
					<span class="item-actions">
						<div class="status">
							<button @click.prevent="show(project)" class="btn btn-primary">Visa projekt</button>
						</div>
					</span>
				</li>
			</ul>

			<div class="alert alert-info" v-else>
				Du har ännu inga skapade projekt.
			</div>
		</template>

		<app-loading v-else></app-loading>

	</div>
</template>

<script>
	export default {
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