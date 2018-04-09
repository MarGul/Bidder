<template>
	<div class="home_hero-component">
		<div class="container">
			<div class="hh-container">
				<transition name="slide-in-left" appear>	
					<div class="hh-left">
						<h1 class="hh-title">
							Skapa en tjänst och få företag att buda på att få utföra den.
						</h1>

						<p class="hh-content mb15">
							Har du något som du behöver hjälp med? Skapa en tjänst hos GoBid helt gratis och få företag att buda om
							att få utföra tjänsten.
						</p>
						<p class="hh-content mt15">
							Skippa allt jobb med att ringa runt till företag och ta in offerter. Låt företagen komma till dig. Simpelt och gratis.
						</p>

						<div class="hh-action">
							<button 
								class="btn btn-orange" 
								v-text="'Skapa en tjänst idag'"
								@click="$router.push('/user/create-service')"
								v-if="$store.getters.isAuthenticated"
							/>

							<button 
								class="btn btn-orange" 
								v-text="'Registrera dig'"
								v-ga="$ga.commands.registerOpened.bind(this, 'Home Hero Button')"
								@click="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})"
								v-else
							/>

							<div class="action-desc">
								Ingen kostnad och inga obligationer.
							</div>
						</div>
					</div>
				</transition>
				<transition name="slide-in-right" appear>
					<div class="hh-right">
						<img src="/images/screen.png" class="img-responsive" alt="">
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