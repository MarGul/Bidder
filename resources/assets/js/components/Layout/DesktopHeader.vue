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
							<router-link to="/services"><i class="icon icon_two_users wh15 light-gray mr10"></i> Sök tjänster</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/information"><i class="icon icon_question_mark wh15 light-gray mr10"></i> Information</router-link>
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
							@click.prevent="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})"
							v-text="'Registrera'"
						/>
					</div>

					<div class="auth-user" v-else>
						<router-link to="/user/create-service" class="btn btn-orange is-flex c_c mr40">
							<i class="icon h_plus white wh15 mr10"></i><span>Skapa ny tjänst</span>
						</router-link>
						<div class="is-flex c_c" @click="toggleDropdown" v-click-outside="close">
							<div class="auth-avatar" :class="defaultAvatar" :style="avatar"></div>
							<i class="icon h_cheveron_down wh20 light-gray ml5" :class="[chevron]"></i>
						</div>
					</div>

					<ul class="auth-dropdown" v-if="dropdown">
						<li>
							<router-link :to="`/profile/${user.username}`">
								<i class="icon h_profile wh20 light-gray mr15"></i>Min profil
							</router-link>
						</li>
						<li class="divider"></li>
						<li>
							<router-link to="/user/services">
								<i class="icon h_briefcase wh20 light-gray mr15"></i>Mina tjänster
							</router-link>
						</li>
						<li>
							<router-link to="/user/bids">
								<i class="icon h_megafon wh20 light-gray mr15"></i>Mina bud
							</router-link>
						</li>
						<li>
							<router-link to="/user/bids">
								<i class="icon h_users wh20 light-gray mr15"></i>Mina projekt
							</router-link>
						</li>
						<li class="divider"></li>
						<li>
							<router-link to="/user/bids">
								<i class="icon h_help wh20 light-gray mr15"></i>Hjälp
							</router-link>
						</li>
						<li>
							<a href="/logout" @click.prevent="logout">
								<i class="icon h_lock_open wh20 light-gray mr15"></i>Logga Ut
							</a>
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