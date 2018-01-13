<template>
	<div class="site-head">
		<nav class="mobile-navigation">
			<ul class="mobile-nav">
				<div @click="hideMenu">
					<li class="nav-item">
						<router-link to="/services">Hitta tjänster</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/information">Information</router-link>
					</li>
					<li v-if="$store.getters.isAuthenticated" class="user-mobile-nav">
						<router-link to="/user/profile" tag="div" class="auth-user">
							<div class="auth-avatar" :class="defaultAvatar" :style="avatar"></div>
							<div class="auth-name">{{ $store.getters.authUser.username }}</div>
						</router-link>
						<ul class="user-mobile-sub-nav">
							<li>
								<router-link to="/user/profile">Profil</router-link>
							</li>
							<li>
								<router-link to="/user/notifications">Notifikationer</router-link>
							</li>
							<li>
								<router-link to="/user/create-service">Skapa ny tjänst</router-link>
							</li>
							<li>
								<router-link to="/user/services">Mina tjänster</router-link>
							</li>
							<li>
								<router-link to="/user/bids">Mina bud</router-link>
							</li>
							<li>
								<router-link to="/user/projects">Mina projekt</router-link>
							</li>
							<li>
								<router-link to="/user/subscruptions">Prenumerationer</router-link>
							</li>
							<li>
								<router-link to="/user/invoices">Betalningar</router-link>
							</li>
							<li>
								<a @click="logout">Logga ut</a>
							</li>
						</ul>
					</li>
					<template v-else>
						<li class="nav-item">
							<a @click.prevent="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})" class="register">Registrera</a>
						</li>
						<li class="nav-item">
							<a @click.prevent="$store.dispatch('openModal', {component: 'login', data: {closeClass: 'white'}})" class="login">Logga In</a>
						</li>
					</template>
				</div>
			</ul>
		</nav>

		<div class="mobile-nav-header">
			<a id="mobile-nav-toggle" href="" @click.prevent="navToggle"><span></span></a>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../includes/Model';

	export default {
		computed: {
			...mapGetters({
				user: 'authUser'
			}),
			avatar() {
				return !!this.user.avatar ? { backgroundImage: `url(${this.user.avatar}` } : {};
			},
			defaultAvatar() {
				return !!this.user.avatar ? [] : ['defaultAvatar'];
			},
		},
		methods: {
			navToggle() {
				if ( document.body.classList.contains('mobile-nav-open') ) {
					document.body.classList.remove('mobile-nav-open');
				} else {
					document.body.classList.add('mobile-nav-open');
				}
			},
			hideMenu() {
				document.body.classList.remove('mobile-nav-open');
			},
			logout() {
				this.$store.dispatch('clearAuthState');
				this.$router.push('/');
				new Model('logout').new().post().catch(error => { location.reload(); });
			}
		}
	}
</script>