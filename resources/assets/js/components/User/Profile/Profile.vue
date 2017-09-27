<template>
	<div class="profile-component">
		
		<div class="main-area-with-sidebar">
			<div class="main-area">
				<app-account></app-account>
			</div>
			<div class="main-area-sidebar">
				<app-profile-picture></app-profile-picture>
			</div>
		</div>

		<div class="main-area-with-sidebar mt30">
			<div class="main-area">
				<app-change-password></app-change-password>
			</div>
			<div class="main-area-sidebar"></div>
		</div>

	</div>
</template>

<script>
	import appAccount from './Account';
	import appChangePassword from './ChangePassword';
	import appProfilePicture from './ProfilePicture';

	export default {
		components: {
			appAccount,
			appChangePassword,
			appProfilePicture
		}
	}
</script>