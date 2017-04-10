<template>
	<div class="user-component no-hero-view">
		<div class="container">
			<button class="btn btn-primary clearfix mobile-user-nav-button" 
					:class="{open: mobileNavOpen}"
					@click="mobileNavOpen = !mobileNavOpen" 
					v-if="breakpoints.isSmallDevices()">
				Meny <i class="fa fa-chevron-down" aria-hidden="true"></i>
			</button>
			<div class="clearfix"></div>

			<div class="user-ui-container">
				<div class="user-ui-nav">
					<ul class="user-nav" v-if="mobileNavOpen || !breakpoints.isSmallDevices()">
						<li><router-link to="/user/profile">Profil</router-link></li>
						<li><router-link to="/user/notifications">Notifikationer</router-link></li>
						<li><router-link to="/user/create-service">Skapa tjänst</router-link></li>
						<li><router-link to="/user/my-services">Mina tjänster</router-link></li>
						<li><router-link to="/user/my-bids">Mina bud</router-link></li>
						<li><router-link to="/user/payments">Betalningar</router-link></li>
					</ul>
				</div>
				<div class="user-ui-content">
					<router-view></router-view>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				breakpoints: window.breakpoints,
				mobileNavOpen: false
			}
		}
	}
</script>