<template>
	<div class="site-head">
		<nav class="mobile-navigation">
			<ul class="mobile-nav">
				<div @click="hideMenu">
					<li class="nav-item">
						<router-link to="/services">Hitta tjänster</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/user/create-service" v-if="$store.getters.isAuthenticated">Skapa Tjänst</router-link>
						<router-link to="/how-to-create-service" v-else>Skapa Tjänst</router-link>
					</li>
					<li v-if="$store.getters.isAuthenticated" class="user-mobile-nav">
						<router-link to="/user/profile" tag="div" class="mobile-nav-highlight">
							<div class="auth-avatar" :style="avatar"></div>
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
					<li class="mobile-nav-highlight is-flex c_c py-15 mt15" v-else>
						<a 
							@click.prevent="$store.dispatch('openModal', {component: 'login', data: {closeClass: 'white'}})" 
							class="is-link is-weight-500 mr15"
							v-text="`Logga in`"
						/>
						<a 
							v-ga="$ga.commands.registerOpened.bind(this, 'Mobile Nav Button')"
							@click.prevent="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})" 
							class="btn btn-primary"
							v-text="`Registrera`"
						/>
					</li>
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
	import realTimeEvents from '../../realTimeEvents';

	export default {
		computed: {
			...mapGetters({
				user: 'authUser'
			}),
			avatar() {
				return !!this.user.avatar ? { backgroundImage: `url(${this.user.avatar}` } : {};
			}
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
				realTimeEvents.stopListenAuth();
				this.$store.dispatch('clearAuthState');
				this.$router.push('/');
				new Model('logout').new().post().catch(error => { location.reload(); });
			}
		}
	}
</script>