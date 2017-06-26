<template>
	<header class="desktop-header">
		<div class="container">
			<div class="desktop-nav">
				<div class="logo">
					<router-link to="/">
						<img src="http://bidder.dev/logo_mock.png" class="logo-img">
					</router-link>
				</div>
				<nav class="desktop-navigation-container">
					<ul class="desktop-navigation">
						<li class="nav-item">
							<router-link to="/categories"><i class="fa fa-list-ul" aria-hidden="true"></i> Kategorier</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/locations"><i class="fa fa-map-marker" aria-hidden="true"></i> Platser</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/services"><i class="fa fa-users" aria-hidden="true"></i> Tjänster</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/information"><i class="fa fa-question" aria-hidden="true"></i> Information</router-link>
						</li>
					</ul>
				</nav>
				<div class="desktop-user-container">
					<div class="guest-actions">
						<a href="#" class="btn btn-transparent">Logga In</a>
						<a href="#" class="btn btn-primary">Registrera</a>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	export default {

	}
</script>