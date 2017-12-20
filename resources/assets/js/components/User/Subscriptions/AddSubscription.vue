<template>
	<div class="add_subscription-component">
		<form @keydown="form.errors.clear()">
			<div class="is-flex-sm margin-row-sm">
				<div class="control-container flex-1-sm padding-col-sm" :class="{'has-errors': form.errors.has('category_id')}">
					<label class="control-label">För kategori:</label>
					<select class="form-control" v-model="form.category_id">
						<option value="">Välj kategori</option>
						<optgroup v-for="rootCat in categories" :key="rootCat.slug" :label="rootCat.name">
							<option 
								v-for="category in rootCat.sub_categories" 
								:key="category.slug" 
								:value="category.id" 
								v-text="category.name"
							></option>
						</optgroup>
					</select>
					<span class="help-block" v-if="form.errors.has('category_id')" v-text="form.errors.get('category_id')"></span>
				</div>
				<div class="control-container flex-1-sm padding-col-sm" :class="{'has-errors': form.errors.has('category_id')}">
					<label class="control-label">För region:</label>
					<select class="form-control" :disabled="regionDisabled" v-model="form.region_id">
						<option value="">Välj region</option>
						<option v-for="region in regions" :value="region.id" v-text="region.name" :key="region.slug"></option>
					</select>
				</div>
				<div class="control-container flex-1-sm padding-col-sm" :class="{'has-errors': form.errors.has('category_id')}">
					<label class="control-label">Eller för stad:</label>
					<select class="form-control" :disabled="citiesDisabled" v-model="form.city_id">
						<option value="">Välj stad</option>
						<option v-for="city in cities" :value="city.id" v-text="city.name" :key="city.slug"></option>
					</select>
				</div>

			</div>

			<div class="row">
				<div class="col-xs-12">
					<button type="button" class="btn btn-primary full-width" :class="{'processing': processing}"
							:disabled="processing || !form.category_id" @click.prevent="add">
						Lägg till prenumeration
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/Model";

	export default {
		data() {
			return {
				processing: false,
				form: new Form({
					category_id: '',
					region_id: '',
					city_id: ''
				})
			}
		},
		computed: {
			categories() {
				return this.$store.getters.categories;
			},
			regions() {
				return this.$store.getters.regions;
			},
			regionDisabled() {
				return this.form.city_id ? true : false;
			},
			cities() {
				return this.$store.getters.cities;
			},
			citiesDisabled() {
				return this.form.region_id ? true : false;
			}
		},
		methods: {
			add() {
				this.processing = true;
				new Model('subscriptions').post(this.form.data())
					.then(response => {
						let subscriptions = this.$store.getters.subscriptions;
						subscriptions.push(response.data.subscription);
						this.$store.commit('SET_SUBSCRIPTIONS', subscriptions);
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Vi har lagt till din prenumeration. När en ny tjänst skapas som du prenumererar på kommer du att få ett email om tjänsten.'
						});
						this.form.reset();
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error.errors);
						this.processing = false;
					})
			}
		}
	}
</script>