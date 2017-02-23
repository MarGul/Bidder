<template>
	<div class="services-component">
		<div class="service-filter-container">
			<div class="row">
				<div class="col-xs-12 col-md-4 column">
					<label>Fritext</label>
					<input type="text" id="filter_text" class="form-control">
				</div>
				<div class="col-xs-12 col-md-4 column">
					<label>Kategorier</label>
					<app-tags-input :items="categories" @add="categoryAdd" @remove="categoryRemove"></app-tags-input>
				</div>
				<div class="col-xs-12 col-md-4 column">
					<label>Platser</label>
					<input type="text" id="filter_text" class="form-control">
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-primary full-width">Hitta Tjänster</button>
				</div>
			</div>
		</div>

		<div class="services">
			<!-- v-for loop through the services with a component -->
		</div>
	</div>
</template>

<script>
	import TagsInput from '../Includes/TagsInput.vue';

	export default {
		props: ['categories', 'regions', 'cities'],
		components: {
			appTagsInput: TagsInput
		},
		methods: {
			categoryAdd(item) {
				this.categories.push({
					text: item,
					value: 2
				});
			},
			categoryRemove(index) {
				this.categories.splice(index, 1);
			}
		}
	}
</script>