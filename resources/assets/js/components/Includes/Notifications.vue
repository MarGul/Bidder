<template>
	<div class="notifications-component" :class="[$store.getters.notificationType]">
		<div class="container">
			<div class="notification-area">
				<div class="notification-message">
					{{ $store.getters.notificationMessage }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			setTimeout(() => {
				this.$store.dispatch('closeNotification');
			}, 5000)
		}
	}
</script>