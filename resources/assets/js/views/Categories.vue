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
				<app-items-block
					:items="categories"
					subItemsKey="sub_categories"
					link="category/{slug}"
				></app-items-block>
			</div>
		</div>
	</div>
</template>

<script>
	import appItemsBlock from '../components/Includes/ItemsBlock';

	export default {
		components: {
			appItemsBlock
		},
		computed: {
			categories() {
				return this.$store.getters.categories;
			}
		}
	}
</script>