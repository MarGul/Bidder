<template>
	<header class="desktop-header">
		<div class="container">
			<div class="desktop-nav">
				<div class="logo">
					<router-link to="/">
						<img src="http://bidder.dev/logo_mock.png" class="logo-img">
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
						<li class="nav-item">
							<router-link to="/information"><i class="icon icon_paper_plane wh15 light-gray mr10"></i> Kontakt</router-link>
						</li>
					</ul>
				</nav>
				<div class="desktop-user-container">
					<div class="guest-actions" v-if="!authenticated">
						<a class="btn btn-transparent" @click.prevent="$store.dispatch('openModal', {component: 'login'})">Logga In</a>
						<a class="btn btn-primary" @click.prevent="$store.dispatch('openModal', {component: 'register'})">Registrera</a>
					</div>

					<div class="auth-user" @click.prevent="toggleDropdown" v-else>
						<div class="auth-avatar" :style="avatar"></div>
						<div class="auth-name">
							{{ user.username }}
							<i class="icon wh12 light-gray ml10" :class="[chevron]"></i>
						</div>
					</div>

					<ul class="auth-dropdown" v-if="dropdown">
						<li>
							<router-link to="/profile/margul"><i class="fa fa-user-circle" aria-hidden="true"></i>Min profil</router-link>
						</li>
						<li>
							<router-link to="/user/create-service"><i class="fa fa-users" aria-hidden="true"></i>Skapa tjänst</router-link>
						</li>
						<li>
							<router-link to="/user/profile"><i class="fa fa-cogs" aria-hidden="true"></i>Inställningar</router-link>
						</li>
						<li>
							<a href="/logout" @click.prevent="logout"><i class="fa fa-power-off" aria-hidden="true"></i>Logga Ut</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters({
				dropdown: 'authDropdown',
				authenticated: 'isAuthenticated',
				user: 'authUser'
			}),
			avatar() {
				return { backgroundImage: `url(${this.user.avatar})` };
			},
			chevron() {
				return this.dropdown ? 'icon_up_chevron' : 'icon_down_chevron';
			}
		},
		methods: {
			toggleDropdown() {
				this.$store.commit('SET_DROPDOWN', !this.dropdown);
			},
			logout() {
				this.$store.dispatch('logout');
				this.$router.push('/');
			}
		}
	}
</script>