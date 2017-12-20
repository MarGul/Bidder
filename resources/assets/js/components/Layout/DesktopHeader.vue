<template>
	<header class="desktop-header">
		<div class="container">
			<div class="desktop-nav">
				<div class="logo">
					<router-link to="/">
						<img src="/logo_mock.png" class="logo-img">
					</router-link>
				</div>
				<nav class="desktop-navigation-container">
					<ul class="desktop-navigation">
						<li class="nav-item">
							<router-link to="/categories"><i class="icon icon_list wh15 light-gray mr10"></i> Kategorier</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/services"><i class="icon icon_two_users wh15 light-gray mr10"></i> Sök tjänster</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/information"><i class="icon icon_question_mark wh15 light-gray mr10"></i> Information</router-link>
						</li>
					</ul>
				</nav>
				<div class="desktop-user-container">
					<div class="guest-actions" v-if="!authenticated">
						<a class="btn btn-transparent" @click.prevent="$store.dispatch('openModal', {component: 'login', data: {closeClass: 'white'}})">Logga In</a>
						<a class="btn btn-primary" @click.prevent="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})">Registrera</a>
					</div>

					<div class="auth-user" @click="toggleDropdown" v-else v-click-outside="close">
						<div class="auth-avatar" :class="defaultAvatar" :style="avatar"></div>
						<div class="auth-name">
							{{ user.username }}
							<i class="icon wh12 light-gray ml10" :class="[chevron]"></i>
						</div>
					</div>

					<ul class="auth-dropdown" v-if="dropdown">
						<li>
							<router-link to="/profile/margul"><i class="icon icon_user wh15 light-gray mr10"></i>Min profil</router-link>
						</li>
						<li>
							<router-link to="/user/create-service"><i class="icon icon_two_users wh15 light-gray mr10"></i>Skapa tjänst</router-link>
						</li>
						<li>
							<router-link to="/user/profile"><i class="icon icon_gears wh15 light-gray mr10"></i>Inställningar</router-link>
						</li>
						<li>
							<a href="/logout" @click.prevent="logout"><i class="icon icon_exit wh15 light-gray mr10"></i>Logga Ut</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../includes/Model';

	export default {
		data() {
			return {
				dropdown: false
			}
		},
		computed: {
			...mapGetters({
				authenticated: 'isAuthenticated',
				user: 'authUser'
			}),
			avatar() {
				return !!this.user.avatar ? { backgroundImage: `url(${this.user.avatar}` } : {};
			},
			defaultAvatar() {
				return !!this.user.avatar ? [] : ['defaultAvatar'];
			},
			chevron() {
				return this.dropdown ? 'icon_up_chevron' : 'icon_down_chevron';
			}
		},
		methods: {
			toggleDropdown() {
				this.dropdown = !this.dropdown;
			},
			logout() {
				this.$store.dispatch('clearAuthState');
				this.$router.push('/');
				new Model('logout').new().post().catch(error => { location.reload(); });
			},
			close() {
				this.dropdown = false;
			}
		}
	}
</script>