<template>
	<div class="notifications-component">
		<h1 class="user-component-title">Notifikationer</h1>

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