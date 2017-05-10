<template>
	<div class="my_projects-component">
		
		<h1 class="user-component-title">Mina projekt</h1>

		<template v-if="fetched">
			<ul class="user-items-list" v-if="projects.length > 0">
				<li v-for="project in projects">
					<span class="item-content">
						#{{ project.id }}
					</span>
					<span class="item-actions">
						<button @click.prevent="show(project)" class="btn-flat btn-default">
							<i class="fa fa-briefcase" aria-hidden="true"></i> Visa projekt
						</button>
						<div class="status">
							<template v-if="project.active">
								Pågående
							</template>
							<template v-else>
								Avslutad
							</template>
						</div>
					</span>
				</li>
			</ul>

			<div class="alert alert-info">
				Du har ännu inga skapade projekt.
			</div>
		</template>

		<div class="load-spinner text-center" v-else>
			<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>

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
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserProjects');
			}
		}
	}
</script>