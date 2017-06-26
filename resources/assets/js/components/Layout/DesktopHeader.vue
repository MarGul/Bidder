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
							<router-link to="/categories"><i class="fa fa-list-ul" aria-hidden="true"></i> Kategorier</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/locations"><i class="fa fa-map-marker" aria-hidden="true"></i> Platser</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/services"><i class="fa fa-users" aria-hidden="true"></i> Tjänster</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/information"><i class="fa fa-question" aria-hidden="true"></i> Information</router-link>
						</li>
					</ul>
				</nav>
				<div class="desktop-user-container">
					<div class="guest-actions" v-if="!$store.getters.isAuthenticated">
						<a class="btn btn-transparent" @click.prevent="$store.dispatch('openModal', {component: 'login'})">Logga In</a>
						<a class="btn btn-primary" @click.prevent="$store.dispatch('openModal', {component: 'register'})">Registrera</a>
					</div>

					<div class="auth-user" @click.prevent="toggleDropdown" v-else>
						<div class="auth-avatar" :style="avatar"></div>
						<div class="auth-name">
							{{ $store.getters.authUser.username }}
							<i class="fa fa-angle-down auth-arrow" :class="{up: dropdown}" aria-hidden="true"></i>
						</div>
					</div>

					<ul class="auth-dropdown" v-if="dropdown">
						<li>
							<router-link to="/user/profile"><i class="fa fa-user-circle" aria-hidden="true"></i>Profil</router-link>
						</li>
						<li>
							<a href="/logout" @click.prevent="logout">
								<i class="fa fa-sign-out" aria-hidden="true"></i>Logga Ut
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		computed: {
			avatar() {
				return { backgroundImage: `url(${this.$store.getters.authUser.avatar})` };
			},
			dropdown() {
				return this.$store.getters.authDropdown;
			}
		},
		methods: {
			toggleDropdown() {
				this.$store.commit('SET_DROPDOWN', {dropdown: !this.$store.getters.authDropdown});
			}
		}
	}
</script>