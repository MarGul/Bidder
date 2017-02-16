<template>
	<div class="categories-view">
		
		<app-hero>
			<h1 slot="title">Kategorier</h1>
			<p slot="left">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.
			</p>
			<img slot="right" src="mechanic.png" alt="">
		</app-hero>

		<div class="container">
			<div class="content">
				Here goes some content and stuff you know all that
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			// If the data isn't already in vuex, load it.
			
		}
	}
</script>