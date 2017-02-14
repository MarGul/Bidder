<template>
	<div class="categories-view">
		
		<app-hero>
			<slot name="title">Kategorier</slot>
			<slot name="left">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.
			</slot>
			<slot name="right">
				<img src="mechanic.png" alt="">
			</slot>
		</app-hero>

		<div class="container">
			<div class="content">
				Here goes some content
			</div>
		</div>
	</div>
</template>

<script>
	import Hero from '../components/Includes/Hero.vue';

	export default {
		components: {
			appHero: Hero
		}
	}
</script>