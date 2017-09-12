<template>
	<div class="profile-component">
		
		<section class="white-contentSection mb30">
			<header class="white-contentSection-header">
				<h3>Min profil</h3>
			</header>
			<div class="white-contentSection-content">
				<div class="row">
					<div class="col-xs-12 col-md-8">
						<app-account></app-account>
					</div>

					<div class="col-xs-12 col-md-4">
						<app-profile-picture></app-profile-picture>
					</div>
				</div>
			</div>
		</section>

		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Uppdatera ditt lösenord</h3>
			</header>
			<div class="white-contentSection-content">
				<app-change-password></app-change-password>
			</div>
		</section>

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