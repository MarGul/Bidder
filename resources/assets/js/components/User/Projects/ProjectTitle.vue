<template>
	<div class="project_title-component">
		<h1 class="user-component-title project-title" :class="{clickable: !edit}" @click="edit = true">
			<div class="left">
				<template v-if="!edit">{{ titleText }}</template>
				<input type="text" class="form-control" v-model="newTitle" autofocus v-else>
			</div>
			<div class="right">
				<i class="fa fa-pencil" aria-hidden="true" v-if="!edit"></i>
				<button class="btn btn-flat btn-primary full-width" @click.stop="change" v-else>Ändra</button>
			</div>
		</h1>
	</div>
</template>

<script>
	import Model from '../../../includes/Model';

	export default {
		props: ['title', 'default'],
		data() {
			return {
				edit: false,
				newTitle: ''
			}
		},
		computed: {
			titleText() {
				return this.title || this.default;
			}
		},
		methods: {
			change() {
				this.edit = false;
				new Model('projects/{id}/title').setId(this.$route.params.id).put({title: this.newTitle})
					.catch(error => { console.log(error); });
				// Update the title in store for project in focus
				let project = this.$store.getters.userProjectFocus;
				project.title = this.newTitle;
				this.$store.commit('SET_PROJECT_FOCUS', {project});
				// Update the title in store for the projects
				let projects = this.$store.getters.userProjects;
				for (let i = 0; i < projects.length; i++) {
					if ( projects[i].id === project.id ) {
						projects[i] = project;
						break;
					}
				}
				this.$store.commit('SET_PROJECTS', {projects});

			}
		},
		created() {
			this.newTitle = this.titleText;
			$('.project-title').on('click', function(event) {
				if ( event.target !== this) return;

				console.log(event);
			});
		}
	}
</script>