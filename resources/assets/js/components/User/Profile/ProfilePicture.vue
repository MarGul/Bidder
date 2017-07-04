<template>
	<div class="profile_picture-component">
		<form enctype="multipart/form-data">
			<label class="profile-picture-label clickable" @mouseenter="hover = true" @mouseleave="hover = false">
				<img :src="image" class="img-responsive" :class="{opacity: hover || processing}">
				<span class="btn btn-default" v-if="hover || processing" :class="{processing}">
					<i class="fa fa-picture-o mr5" aria-hidden="true"></i> Ladda upp ny bild
				</span>
				<input type="file" accept="image/*" class="hidden" @change="upload($event.target.files)">
			</label>
		</form>
	</div>
</template>

<script>
	import Model from '../../../includes/Model';

	export default {
		data() {
			return {
				processing: false,
				hover: false
			}
		},
		computed: {
			image() {
				return this.$store.getters.authUser.avatar;
			}
		},
		methods: {
			upload(files) {
				if ( files.length ) {
					this.processing = true;
					
					const formData = new FormData();
					formData.append('picture', files[0], files[0].name);
					
					new Model(`users/${this.$store.getters.authUser.id}/profile-picture`).post(formData)
						.then(response => {
							console.log(response);
							this.processing = false;
						})
						.catch(error => {
							console.log(error);
						});
				}
			}
		}
	}
</script>