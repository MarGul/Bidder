<template>
	<div class="user-component no-hero-view">
		<div class="container">
			<button class="btn btn-primary clearfix mobile-user-nav-button" 
					:class="{open: mobileNavOpen}"
					@click="mobileNavOpen = !mobileNavOpen" 
					v-if="breakpoints.isSmallDevices()">
				Meny <i class="fa fa-chevron-down" aria-hidden="true"></i>
			</button>
			<div class="clearfix"></div>

			<div class="user-ui-container">
				<div class="user-ui-nav">
					<ul class="user-nav" v-if="mobileNavOpen || !breakpoints.isSmallDevices()">
						<li><a href="#">Profil</a></li>
						<li><a href="#">Notifikationer</a></li>
						<li><a href="#" class="active">Skapa tjänst</a></li>
						<li><a href="#">Mina tjänster</a></li>
						<li><a href="#">Mina bud</a></li>
						<li><a href="#">Betalningar</a></li>
					</ul>
				</div>
				<div class="user-ui-content">
					bla
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				breakpoints: window.breakpoints,
				mobileNavOpen: false
			}
		}
	}
</script>