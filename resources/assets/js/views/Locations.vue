<template>
	<div class="regions-view">
		<app-hero>
			<h1 slot="title">Platser</h1>
			<p slot="left">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.
			</p>
			<img slot="right" src="mechanic.png" alt="">
		</app-hero>

		<div class="container">
			<div class="content">
				<app-items-block
					:items="regions"
					subItemsKey="cities"
					link="city/{slug}"
					allLink="region/{slug}"
				></app-items-block>
			</div>
		</div>
	</div>
</template>

<script>
	import ItemsBlock from '../components/Includes/ItemsBlock.vue';

	export default {
		components: {
			appItemsBlock: ItemsBlock
		},
		computed: {
			regions() {
				return this.$store.getters.getRegions;
			}
		}
	}
</script>