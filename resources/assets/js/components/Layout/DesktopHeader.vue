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
								<div class="auth-avatar" :style="avatar"></div>
								<i class="icon wh20 white ml5" :class="[chevron]"></i>
							</div>
						</div>

					</div>
				</div>

				<desktop-auth-dropdown v-if="dropdown" />
			</div>
		</div>
	</header>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../includes/Model';
	import desktopAuthDropdown from './DesktopAuthDropdown'

	export default {
		components: {
			desktopAuthDropdown
		},
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
			chevron() {
				return this.dropdown ? 'h_cheveron_up' : 'h_cheveron_down';
			}
		},
		methods: {
			toggleDropdown() {
				this.dropdown = !this.dropdown;
			},
			close() {
				this.dropdown = false;
			}
		}
	}
</script>