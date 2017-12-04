<template>
	<div class="site-head">
		<nav class="mobile-navigation">
			<ul class="mobile-nav">
				<div @click="hideMenu">
					<li class="nav-item">
						<router-link to="/categories"><i class="icon icon_list wh15 light-gray mr15"></i> Kategorier</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/services"><i class="icon icon_two_users wh15 light-gray mr15"></i> Sök tjänster</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/information"><i class="icon icon_question_mark wh15 light-gray mr15"></i> Information</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/contact"><i class="icon icon_paper_plane wh15 light-gray mr15"></i> Kontakt</router-link>
					</li>
					<li class="spacer"></li>
					<li v-if="$store.getters.isAuthenticated" class="nav-item">
						<router-link to="/user/profile">
							<div class="auth-user">
								<div class="auth-avatar" :class="defaultAvatar" :style="avatar"></div>
								<div class="auth-name">{{ $store.getters.authUser.username }}</div>
							</div>
						</router-link>
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
			}
		}
	}
</script>