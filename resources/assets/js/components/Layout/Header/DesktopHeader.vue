<template>
	<div class="site-head">

		<header class="desktop-header">
			<div class="container">
				<div class="row">
					
					<div class="hidden-xs hidden-sm col-md-3 col-lg-3 desktop-header-left">
						<img src="logo_mock.png" class="logo">
					</div>

					<div class="col-xs-12 col-md-6 col-lg-6 desktop-header-mid">
						<app-search></app-search>
					</div>

					<div class="hidden-xs hidden-sm col-md-3 col-lg-3 desktop-header-right">
						<ul class="desktop-header-nav clearfix">
							<li>
								<router-link to="/register" class="register">Registrera</router-link>
							</li>
							<li>
								<router-link to="/login" class="login">Logga In</router-link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>

		<nav class="desktop-navigation">
			<div class="container">
				<ul class="desktop-nav clearfix">
					<li class="nav-item">
						<router-link to="/categories"><i class="fa fa-list-ul" aria-hidden="true"></i> Kategorier</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/regions"><i class="fa fa-map-marker" aria-hidden="true"></i> Regioner</router-link>
					</li>
					<li class="nav-item">
						<a href="#"><i class="fa fa-building" aria-hidden="true"></i> Städer</a>
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

	export default {
		components: {
			appSearch: Search
		}
	}
</script>