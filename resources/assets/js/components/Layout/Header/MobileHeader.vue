<template>
	<div class="site-head">
		<nav class="mobile-navigation">
			<ul class="mobile-nav" @click="hideMenu">
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
				<li class="spacer"></li>
				<li v-if="$store.getters.isAuthenticated" class="nav-item">
					<router-link to="/user/profile">
						<div class="auth-user">
							<div class="auth-avatar" :style="avatar"></div>
							<div class="auth-name">{{ $store.getters.authUser.username }}</div>
						</div>
					</router-link>
				</li>
				<template v-else>
					<li class="nav-item">
						<a @click.prevent="$store.dispatch('openModal', {component: 'register'})" class="register">Registrera</a>
					</li>
					<li class="nav-item">
						<a @click.prevent="$store.dispatch('openModal', {component: 'login'})" class="login">Logga In</a>
					</li>
				</template>
			</ul>
		</nav>

		<div class="mobile-nav-header">
			<a id="mobile-nav-toggle" href="" @click.prevent="navToggle"><span></span></a>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			avatar() {
				return { backgroundImage: `url(${this.$store.getters.authUser.avatar}` };
			}
		},
		methods: {
			navToggle() {
				if ( $('body').hasClass('mobile-nav-open') ) {
					$('body').removeClass('mobile-nav-open');
				} else {
					$('body').addClass('mobile-nav-open');
				}
			},
			hideMenu() {
				$('body').removeClass('mobile-nav-open');
			}
		}
	}
</script>