<template>
	<div class="site-head">

		<header class="desktop-header">
			<div class="container">
				<div class="row">
					
					<div class="hidden-xs hidden-sm col-md-3 col-lg-3 desktop-header-left">
						<router-link to="/">
							<img src="logo_mock.png" class="logo">
						</router-link>
					</div>

					<div class="col-xs-12 col-md-6 col-lg-6 desktop-header-mid">
						<app-search></app-search>
					</div>

					<div class="hidden-xs hidden-sm col-md-3 col-lg-3 desktop-header-right">
						<div v-if="$store.getters.isAuthenticated" class="auth-user">
							<div class="auth-avatar"></div>
							<div class="auth-name">{{ $store.getters.authUser.name }}</div>
						</div>

						<ul v-else class="desktop-header-nav">
							<li>
								<a @click.prevent="$store.dispatch('openModal', {component: 'register'})" class="register">Registrera</a>
							</li>
							<li>
								<a @click.prevent="$store.dispatch('openModal', {component: 'login'})" class="login">Logga In</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>

		<nav class="desktop-navigation">
			<div class="container">
				<ul class="desktop-nav">
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
						<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link</a>
					</li>
					<li class="nav-item">
						<router-link to="/information"><i class="fa fa-question" aria-hidden="true"></i> Information</router-link>
					</li>				
				</ul>
			</div>
		</nav>

	</div>
</template>

<script>
	import Search from '../../Includes/Search.vue';
	import Register from '../../Register/Register.vue';

	export default {
		components: {
			appSearch: Search,
			appRegister: Register
		},
		data() {
			return {
				register: false
			}
		}
	}
</script>