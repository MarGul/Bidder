<template>
	<div class="hero">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-7 col-lg-8">
					<div class="hero-left">
						<transition name="fade-in" appear>
							<h2 slot="title"></h2>
						</transition>
						<transition name="fade-in-slow" appear>
							<slot name="left"></slot>
						</transition>
					</div>
				</div>
				<div class="hidden-xs col-sm-6 col-md-5 hero-right text-center col-lg-4">
					<transition name="slide-in" mode="out-in" appear>
						<div class="hero-right">
							<slot name="right"></slot>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>