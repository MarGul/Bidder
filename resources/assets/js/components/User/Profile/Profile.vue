<template>
	<div class="profile-component">
		
		<h1 class="user-component-title">Min Profil</h1>
		
			<div class="row">
				<div class="col-xs-12 col-md-7">
					<app-account></app-account>
				</div>

				<div class="col-xs-12 col-md-5">
					<app-profile-picture></app-profile-picture>
				</div>
			</div>
		</form>

		<h2 class="user-component-title subsection">Uppdatera ditt lösenord</h2>

		<div class="row">
			<div class="col-xs-12 col-md-7">
				<app-change-password></app-change-password>
			</div>
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