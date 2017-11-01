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
								<div class="item-header">
									{{ project.users[0].pivot.title }}
								</div>
								<div class="item-sub-data">
									<span class="mr5"></span>&bull;
									<span class="ml5"></span>
								</div>
							</div>
							<div class="item-go-to">
								<i class="icon icon_arrow_right wh12"></i>
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
				projects: 'userProjects'
			}),
		},
		methods: {
			show(project) {
				this.$router.push(`/user/projects/${project.id}`);
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('user/projects').get()
					.then(response => {
						this.$store.commit('SET_USER_PROJECTS_FETCHED', true);
						this.$store.commit('SET_USER_PROJECTS', response.projects);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>