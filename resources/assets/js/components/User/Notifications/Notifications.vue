<template>
	<div class="notifications-component">
		<app-notification-settings></app-notification-settings>
	</div>
</template>

<script>
	import appNotificationSettings from './NotificationSettings';

	export default {
		components: {
			appNotificationSettings
		}
	}
</script>