<template>
	<div class="hero">
		<div class="container">
			<div class="hero-container">
				<div class="hero-left">
					<transition name="fade-in" appear>
						<slot name="title"></slot>
					</transition>
					<transition name="fade-in-slow" appear>
						<slot name="left"></slot>
					</transition>
				</div>

				<div class="hidden-xs hero-right">
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