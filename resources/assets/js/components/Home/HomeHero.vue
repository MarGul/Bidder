<template>
	<div class="home_hero-component">
		<div class="container">
			<div class="hh-container">
				<transition name="slide-in-left" appear>	
					<div class="hh-left">
						<h1 class="hh-title">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit!
						</h1>

						<p class="hh-content">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatibus adipisci nemo labore? Non quidem modi vel harum corporis enim est unde quibusdam, vitae animi, perferendis consectetur impedit dicta labore!
						</p>

						<div class="hh-action">
							<button class="btn btn-orange">
								Skapa en tjänst idag
							</button>
							<div class="action-desc">
								Ingen kostnad och inga obligationer.
							</div>
						</div>
					</div>
				</transition>
				<transition name="slide-in-right" appear>
					<div class="hh-right">
						<img src="/screen.png" class="img-responsive" alt="">
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>