<template>
	<div class="notifications-component">
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Notifikationer</h3>
			</header>
			<div class="white-contentSection-content">
				<app-notification-settings></app-notification-settings>
			</div>
		</section>
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