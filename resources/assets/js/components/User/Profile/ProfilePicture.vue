<template>
	<div class="profile_picture-component">
		<form enctype="multipart/form-data">
			<label class="profile-picture-label clickable" @mouseenter="hover = true" @mouseleave="hover = false">
				<img :src="image" class="img-responsive">
				<span class="btn btn-default" v-if="hover" :class="{processing}">
					<i class="fa fa-picture-o mr5" aria-hidden="true"></i> Ladda upp ny bild
				</span>
				<input type="file" accept="image/*" class="hidden">
			</label>
		</form>
	</div>
</template>

<script>
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
		}
	}
</script>