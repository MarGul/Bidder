<template>
	<header class="desktop-header">
		<div class="container">
			<div class="is-relative">
				<div class="desktop-nav">
					<div class="logo">
						<router-link to="/">
							<img src="/logo_mock.png" class="logo-img">
						</router-link>
					</div>
					<nav class="desktop-navigation-container">
						<ul class="desktop-navigation">
							<li class="nav-item">
								<router-link to="/services">Hitta Tjänster</router-link>
							</li>
							<li class="nav-item">
								<router-link to="/user/create-service" v-if="$store.getters.isAuthenticated">Skapa Tjänst</router-link>
								<router-link to="/how-to-create-service" v-else>Skapa Tjänst</router-link>
							</li>
							<li class="nav-item">
								<router-link to="/about">Om GoBid</router-link>
							</li>
						</ul>
					</nav>
					<div class="desktop-user-container">
						<div class="guest-actions" v-if="!authenticated">
							<a 
								class="btn btn-transparent" 
								@click.prevent="$store.dispatch('openModal', {component: 'login', data: {closeClass: 'white'}})"
								v-text="'Logga In'"
							/>
							<a 
								class="btn btn-primary" 
								v-ga="$ga.commands.registerOpened.bind(this, 'Desktop Nav Button')"
								@click.prevent="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})"
								v-text="'Registrera'"
							/>
						</div>

						<div class="auth-user" v-else>
							<router-link to="/user/create-service" class="btn btn-orange is-flex c_c mr40" v-if="false">
								<i class="icon h_plus white wh15 mr10"></i><span>Skapa ny tjänst</span>
							</router-link>
							<div class="is-flex c_c mr25 notifications-icon-container" @click="toggleNotificationsDropdown" v-click-outside="closeNotifications">
								<i class="icon icon_notifications wh20 white"></i>
								<span class="notifications-badge" v-text="unreadNotifications" v-if="unreadNotifications !== 0" />
							</div>
							<div class="is-flex c_c" @click="toggleAuthDropdown" v-click-outside="closeAuth">
								<div class="auth-avatar" :style="avatar"></div>
								<i class="icon wh20 white ml5" :class="[chevron]"></i>
							</div>
						</div>

					</div>
				</div>

				<desktop-auth-dropdown v-if="authDropdown" />
				<desktop-notifications-dropdown v-if="notificationsDropdown" />
			</div>
		</div>
	</header>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../includes/Model';
	import desktopAuthDropdown from './DesktopAuthDropdown';
	import desktopNotificationsDropdown from './DesktopNotificationsDropdown';

	export default {
		components: {
			desktopAuthDropdown,
			desktopNotificationsDropdown
		},
		data() {
			return {
				authDropdown: false,
				notificationsDropdown: false
			}
		},
		computed: {
			...mapGetters({
				authenticated: 'isAuthenticated',
				user: 'authUser',
				unreadNotifications: 'userUnreadNotifications'
			}),
			avatar() {
				return !!this.user.avatar ? { backgroundImage: `url(${this.user.avatar}` } : {};
			},
			chevron() {
				return this.dropdown ? 'h_cheveron_up' : 'h_cheveron_down';
			}
		},
		methods: {
			toggleAuthDropdown() {
				this.authDropdown = !this.authDropdown;
			},
			closeAuth() {
				this.authDropdown = false;
			},
			toggleNotificationsDropdown() {
				this.notificationsDropdown = !this.notificationsDropdown;
			},
			closeNotifications() {
				this.notificationsDropdown = false;
			}
		}
	}
</script>