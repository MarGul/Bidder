<template>
	<div class="notification_settings-component">
		
	</div>
</template>

<script>
	export default {
		created() {
			axios.get(`users/${this.$store.getters.authUser.id}/notification-settings`)
				.then(response => {
					console.log(response);
				});
		}
	}
</script>