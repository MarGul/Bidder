<template>
	<div class="container">
		<div class="content">
			
			<div class="user-view">
				<nav class="user-navigation">
					<div class="small-device-actions clearfix">
						<button class="btn btn-primary-bordered user-nav-button mb10" @click.prevent="toggleMenu" v-if="breakpoints.isSmallDevices()">
							Andra inställningar
						</button>
					</div>
					<ul class="user-nav">
						<li>
							<router-link to="/user/profile">
								<i class="icon icon_user wh15 light-gray mr15"></i>
								<span class="link-text">Profil</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/notifications">
								<i class="icon icon_bell wh15 light-gray mr15"></i>
								<span class="link-text">Notifikationer</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/create-service">
								<i class="icon icon_document_check wh15 light-gray mr15"></i>
								<span class="link-text">Skapa tjänst</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/services">
								<i class="icon icon_monitor wh15 light-gray mr15"></i>
								<span class="link-text">Mina tjänster</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/bids">
								<i class="icon icon_bid wh15 light-gray mr15"></i>
								<span class="link-text">Mina bud</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/projects">
								<i class="icon icon_two_users wh15 light-gray mr15"></i>
								<span class="link-text">Mina projekt</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/subscriptions">
								<i class="icon icon_retweet wh15 light-gray mr15"></i>	
								<span class="link-text">Prenumerationer</span>
							</router-link>
						</li>
						<li>
							<router-link to="/user/invoices">
								<i class="icon icon_credit_card wh15 light-gray mr15"></i>
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