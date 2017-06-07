<template>
	<div class="add_subscription-component">
		<div class="row">
			<div class="col-xs-12 col-md-4">
				<div class="form-group">
					<label class="control-label">För kategori:</label>
					<select class="form-control">
						<option v-for="category in categories" :value="category.id" v-text="category.name"></option>
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-md-4">
				<div class="form-group">
					<label class="control-label">För region:</label>
					<select class="form-control">
						<option value="">Välj region</option>
						<option v-for="region in regions" :value="region.id" v-text="region.name"></option>
					</select>
				</div>
			</div>
			<div class="col-xs-12 col-md-4">
				<div class="form-group">
					<label class="control-label">Eller för stad:</label>
					<select class="form-control">
						<option value="">Välj stad</option>
						<option v-for="city in cities" :value="city.id" v-text="city.name"></option>
					</select>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<button type="button" class="btn btn-primary full-width" :class="{'processing': processing}"
						:disabled="processing" @click.prevent="add">
					Lägg till prenumeration
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				processing: false
			}
		},
		computed: {
			categories() {
				return this.$store.getters.getCategoriesFlatten;
			},
			regions() {
				return this.$store.getters.getRegions;
			},
			cities() {
				return this.$store.getters.getCities;
			}
		},
		methods: {
			add() {
				this.processing = true;
			}
		}
	}
</script>