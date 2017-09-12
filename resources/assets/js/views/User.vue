<template>
	<div class="container">
		<div class="content">
			
			<div class="user-view">
				<nav class="user-navigation">
					<div class="small-device-actions clearfix">
						<button class="btn btn-primary-bordered user-nav-button mb10" @click.prevent="toggleMenu" v-if="breakpoints.isSmallDevices()">
							Andra inställningar
							<svg-icon icon="arrowDown" fill="#009999" classes="vertical-centered"></svg-icon>
						</button>
					</div>
					<ul class="user-nav">
						<li>
							<router-link to="/user/profile">
								<svg-icon icon="user" fill="#009999"></svg-icon>
								<span class="link-text">Profil</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/notifications">
								<svg-icon icon="notifications" fill="#009999"></svg-icon>
								<span class="link-text">Notifikationer</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/create-service">
								<svg-icon icon="fileCheckmark" fill="#009999"></svg-icon>
								<span class="link-text">Skapa tjänst</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/services">
								<svg-icon icon="monitor" fill="#009999"></svg-icon>
								<span class="link-text">Mina tjänster</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/bids">
								<svg-icon icon="gavel" fill="#009999"></svg-icon>
								<span class="link-text">Mina bud</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/projects">
								<svg-icon icon="twoUsers" fill="#009999"></svg-icon>
								<span class="link-text">Mina projekt</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/subscriptions">
								<svg-icon icon="retweet" fill="#009999"></svg-icon>	
								<span class="link-text">Prenumerationer</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/invoices">
								<svg-icon icon="creditCard" fill="#009999"></svg-icon>
								Betalningar
							</router-link>
						</li>
					</ul>
				</nav>
				<section class="user-content">
					<router-view></router-view>
				</section>
			</div>

		</div>
	</div>
</template>

<script>
	import svgIcon from '../components/Includes/Icons';

	export default {
		components: {
			svgIcon
		},
		data() {
            return {
                breakpoints: window.breakpoints,
            }
        },
        methods: {
        	toggleMenu() {
        		let userNav = document.querySelector('.user-nav');

        		if ( userNav.classList.contains('must-show') ) {
        			document.querySelector('.user-nav').classList.remove('must-show');
        		} else {
        			document.querySelector('.user-nav').classList.add('must-show');
        		}
        	}
        }
	}
</script>