<template>
	<div class="user-component no-hero-view">
		
		<app-notifications v-if="$store.getters.showingNotification"></app-notifications>

		<div class="container">
			<div class="mobile-user-nav clearfix" v-if="breakpoints.isSmallDevices()">
				<div class="mobile-user-buttons">
					<button class="btn btn-transparent logout-btn" @click.prevent="logout">
						Logga Ut <i class="fa fa-sign-out" aria-hidden="true"></i>
					</button>

					<button class="btn btn-primary nav-btn" 
							:class="{open: $store.getters.mobileAuthDropdown}"
							@click="toggleDropdown" 
							v-if="breakpoints.isSmallDevices()">
						Meny <i class="fa fa-chevron-down" aria-hidden="true"></i>
					</button>
				</div>
			</div>

			<div class="user-ui-container">
				<div class="user-ui-nav">
					<ul class="user-nav" v-if="$store.getters.mobileAuthDropdown || !breakpoints.isSmallDevices()">
						<li><router-link to="/user/profile">Profil</router-link></li>
						<li><router-link to="/user/notifications">Notifikationer</router-link></li>
						<li><router-link to="/user/create-service">Skapa tjänst</router-link></li>
						<li><router-link to="/user/my-services">Mina tjänster</router-link></li>
						<li><router-link to="/user/my-bids">Mina bud</router-link></li>
						<li><router-link to="/user/my-projects">Mina projekt</router-link></li>
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
	import appNotifications from '../components/Includes/Notifications';

	export default {
		components: {
			appNotifications
		},
		data() {
			return {
				breakpoints: window.breakpoints
			}
		},
		methods: {
			toggleDropdown() {
				this.$store.commit('SET_MOBILE_DROPDOWN', {
					mobileDropdown: !this.$store.getters.mobileAuthDropdown
				});
			},
			logout() {
				this.$store.dispatch('logout');
				this.$router.push('/');
			}
		}
	}
</script>