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
	import Model from '../../../includes/models/Model';

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
					.then(response => {
						console.log(response);
					})
					.catch(error => {
						console.log(error);
					});
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