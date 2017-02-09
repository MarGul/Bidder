<template>
	<div class="site-head">
		<nav class="mobile-navigation">
			<ul class="mobile-nav">
				<li class="nav-item"><a href="#">Link 1</a></li>
				<li class="nav-item"><a href="#">Link 2</a></li>
				<li class="nav-item"><a href="#">Link 3</a></li>
				<li class="nav-item"><a href="#">Link 4</a></li>
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
			}
		}
	}
</script>