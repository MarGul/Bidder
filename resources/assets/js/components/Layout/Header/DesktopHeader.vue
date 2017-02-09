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
								<a href="#" class="register">Registrera</a>
							</li>
							<li>
								<a href="#" class="login">Logga In</a>
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
						<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link 1</a>
					</li>
					<li class="nav-item">
						<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link 2</a>
					</li>
					<li class="nav-item">
						<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link 3</a>
					</li>
					<li class="nav-item">
						<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link 4</a>
					</li>
					<li class="nav-item">
						<a href="#"><i class="fa fa-globe" aria-hidden="true"></i> Link 5</a>
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