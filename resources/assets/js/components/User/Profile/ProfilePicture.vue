<template>
	<div class="profile_picture-component">
		<section class="transparent-contentSection">
			<header class="transparent-contentSection-header mb15" v-if="breakpoints.isSmallDevices()">
				<h3 class="text-left">Profilbild</h3>
			</header>
			<form enctype="multipart/form-data">
				<label class="profile-picture-label clickable" @mouseenter="hover = true" @mouseleave="hover = false">
					<img :src="image" class="img-responsive" :class="{opacity: hover || processing}">
					<span class="btn btn-default is-flex c_c" v-if="hover || processing || breakpoints.isSmallDevices()" :class="{processing}">
						<i class="icon icon_image wh15 cursor-default mr10"></i> Ladda upp ny bild
					</span>
					<input type="file" accept="image/*" class="hidden" @change="upload($event.target.files)" :disabled="processing">
				</label>
			</form>
		</section>
	</div>
</template>

<script>
	import Model from '../../../includes/Model';

	export default {
		data() {
			return {
				breakpoints: window.breakpoints,
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
					formData.append('avatar', files[0], files[0].name);
					
					new Model(`users/${this.$store.getters.authUser.id}/avatar`).post(formData)
						.then(response => {
							this.$store.commit('SET_USER', {user: response.user});
							this.$store.dispatch('showNotification', {type: 'success', msg: 'Nice! Du uppdaterade din avatar.'});
							this.processing = false;
						})
						.catch(error => {
							this.$store.dispatch('showNotification', {type: 'error', msg: 'Vi kunde inte uppdatera din avatar. Var god försök igen.'});
						});
				}
			}
		}
	}
</script>