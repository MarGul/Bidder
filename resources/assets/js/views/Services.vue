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
					:categories="category"
					:regions="region"
					:cities="city"
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
		},
		data() {
			return {
				category: [{text: 'CategoryTest', value: 1337}, {text: 'Category2', value: 13}],
				region: [{text: 'Region1', value:1}, {text: 'Region2', value:2}],
				city: [{text: 'City1', value:1}, {text: 'City2', value:2}]
			}
		}
	}
</script>