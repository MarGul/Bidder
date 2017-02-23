<template>
	<div class="services-view">
		<app-hero>
			<h1 slot="title">Tjänster</h1>
			<p slot="left">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.
			</p>
			<img slot="right" src="mechanic.png" alt="">
		</app-hero>

		<div class="container">
			<div class="content">
				<app-services
					:categories="['Category1', 'Category2']"
					:locations="['Helsingborg', 'Landskrona']"
				></app-services>
			</div>
		</div>
	</div>
</template>

<script>
	import Services from '../components/Services/Services.vue';;

	export default {
		components: {
			appServices: Services
		}
	}
</script>