<template>
	<div class="my_projects-component">
		
		<h1 class="user-component-title">Mina projekt</h1>

		<ul class="user-items-list" v-if="fetched">
			<li v-for="project in projects">
				<span class="item-content">
					#{{ project.id }}
				</span>
				<span class="item-actions">
					<router-link :to="`/user/project/${project.id}`" class="btn-flat btn-default">
						<i class="fa fa-briefcase" aria-hidden="true"></i> Visa projekt
					</router-link>
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
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserProjects');
			}
		}
	}
</script>