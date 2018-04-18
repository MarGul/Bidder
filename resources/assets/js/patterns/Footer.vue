<template>
	<footer class="site-footer">
		<div class="container">
			<div class="footer-callouts">
				<div class="f__callout footer-brand">
					<router-link to="/">
						<img src="/images/logo.png" class="logo-img">
					</router-link>
				</div>
				<div class="f__callout">
					<div class="f__callout-heading">GoBid</div>
					<ul class="f__links">
						<li>
							<router-link to="/about">Om GoBid</router-link>
						</li>
						<li>
							<router-link to="/faq">Frågor &amp; svar</router-link>
						</li>
						<li>
							<router-link to="/terms">Villkor &amp; regler</router-link>
						</li>
					</ul>
				</div>
				<div class="f__callout">
					<div class="f__callout-heading">Kontakt</div>
					<div class="contact-container">
						<div>
							<span class="is-link" @click="$store.dispatch('openModal', {component: 'feedback', data: {closeClass: 'white', subject: 'other'}})">
							Kontakta oss
							</span>
						</div>
						<div>orgnr: 559141-0294</div>
					</div>
					<ul class="f__social-media-link">
						<li>
							<a href="https://www.facebook.com/gobidab/" target="_blank"><i class="icon icon_facebook wh30"></i></a>
						</li>
						<li>
							<a href="https://www.instagram.com/gobid.se" target="_blank"><i class="icon icon_instagram wh30"></i></a>
						</li>
						<li>
							<a href="https://www.youtube.com/channel/UCkS7EOpGFYOtEvuCaPUyDFg" target="_blank"><i class="icon icon_youtube wh30"></i></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		
	}
</script>