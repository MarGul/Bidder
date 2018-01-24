<template>
	<div class="my_projects-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Mina projekt</h3>
			</header>
			<div class="white-contentSection-content">
				<template v-if="fetched">
					<ul class="items-list" v-if="projects.length > 0">
						<li class="gray-item clickable" v-for="project in projects" :key="project.id" @click="show(project)">
							<div class="item-content">
								<div class="item-header" v-text="title(project)"></div>
								<div class="item-sub-data" v-text="projectStatusText(project)"></div>
							</div>
							<div class="item-go-to">
								<i class="icon h_cheveron_right light-gray wh15"></i>
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
	import { mapGetters } from 'vuex';
	import Model from '../../../includes/Model';

	export default {
		computed: {
			...mapGetters({
				fetched: 'userProjectsFetched',
				projects: 'userProjects',
				user: 'authUser'
			})
		},
		methods: {
			show(project) {
				this.$router.push(`/user/projects/${project.id}`);
			},
			title(project) {
				let me = project.users.find(u => u.id === this.user.id );

				return me ? me.pivot.title : '';
			},
			projectStatusText(project) {				
				if ( project.completed ) return 'Avslutat';

				if ( project.cancelled ) return 'Avbrutet';

				if ( project.started ) return 'Pågår';

				return 'Ej startat';
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('user/projects').get()
					.then(response => {
						this.$store.commit('SET_USER_PROJECTS_FETCHED', true);
						this.$store.commit('SET_USER_PROJECTS', response.data.projects);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>