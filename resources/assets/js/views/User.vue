<template>
	<div class="container">
		<div class="content">
			
			<div class="user-view">
				<nav class="user-navigation" v-if="!breakpoints.isSmallDevices()">
					<h3 class="nav-section-heading">Inställningar</h3>
					<ul class="nav-section">
						<li>
							<router-link to="/user/profile">
								<i class="icon h_profile wh20 light-gray"></i>
								<span class="link-text">Profil</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/notifications">
								<i class="icon h_notification wh20 light-gray"></i>
								<span class="link-text">Notifieringar</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/create-service">
								<i class="icon h_browser wh20 light-gray"></i>
								<span class="link-text">Skapa tjänst</span>
							</router-link>
						</li>
					</ul>

					<h3 class="nav-section-heading">Mina resurser</h3>
					<ul class="nav-section">
						<li>
							<router-link to="/user/services">
								<i class="icon h_briefcase wh20 light-gray"></i>
								<span class="link-text">Tjänster</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/bids">
								<i class="icon h_megafon wh20 light-gray"></i>
								<span class="link-text">Bud</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/projects">
								<i class="icon h_users wh20 light-gray"></i>
								<span class="link-text">Projekt</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/subscriptions">
								<i class="icon h_repeat wh20 light-gray"></i>	
								<span class="link-text">Prenumerationer</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/invoices">
								<i class="icon h_payment wh20 light-gray"></i>
								<span class="link-text">Betalningar</span>
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
	export default {
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