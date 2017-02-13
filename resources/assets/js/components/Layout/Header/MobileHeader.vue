<template>
	<div class="site-head">
		<nav class="mobile-navigation">
			<ul class="mobile-nav">
				<li class="nav-item" @click="hideMenu">
					<router-link to="/categories"><i class="fa fa-list-ul" aria-hidden="true"></i> Kategorier</router-link>
				</li>
				<li class="nav-item" @click="hideMenu">
					<router-link to="/regions"><i class="fa fa-map-marker" aria-hidden="true"></i> Regioner</router-link>
				</li>
				<li class="nav-item" @click="hideMenu">
					<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link</a>
				</li>
				<li class="nav-item" @click="hideMenu">
					<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link</a>
				</li>
				<li class="nav-item" @click="hideMenu">
					<router-link to="/information"><i class="fa fa-question" aria-hidden="true"></i> Information</router-link>
				</li>
				<li class="spacer"></li>
				<li class="nav-item" @click="hideMenu">
					<router-link to="/register"><i class="fa fa-user-circle" aria-hidden="true"></i> Registrera</router-link>
				</li>
				<li class="nav-item" @click="hideMenu">
					<router-link to="/login"><i class="fa fa-unlock-alt" aria-hidden="true"></i> Logga In</router-link>
				</li>
			</ul>
		</nav>

		<div class="mobile-nav-header">
			<a id="mobile-nav-toggle" href="" @click.prevent="navToggle"><span></span></a>
		</div>
	</div>
</template>

<script>
	export default {
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