<template>
	<div class="add_subscription-component mb40">
		<form @keydown="form.errors.clear()">
			<div class="row">
				<div class="col-xs-12 col-md-4">
					<div class="form-group">
						<label class="control-label">För kategori:</label>
						<select class="form-control" v-model="form.category_id">
							<option value="">Välj kategori</option>
							<option v-for="category in categories" :value="category.id" v-text="category.name"></option>
						</select>
						<span class="help-block" v-if="form.errors.has('category_id')" v-text="form.errors.get('category_id')"></span>
					</div>
				</div>
				<div class="col-xs-12 col-md-4">
					<div class="form-group">
						<label class="control-label">För region:</label>
						<select class="form-control" :disabled="regionDisabled" v-model="form.region_id">
							<option value="">Välj region</option>
							<option v-for="region in regions" :value="region.id" v-text="region.name"></option>
						</select>
					</div>
				</div>
				<div class="col-xs-12 col-md-4">
					<div class="form-group">
						<label class="control-label">Eller för stad:</label>
						<select class="form-control" :disabled="citiesDisabled" v-model="form.city_id">
							<option value="">Välj stad</option>
							<option v-for="city in cities" :value="city.id" v-text="city.name"></option>
						</select>
					</div>
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
				return this.$store.getters.getCategoriesFlatten;
			},
			regions() {
				return this.$store.getters.getRegions;
			},
			regionDisabled() {
				return this.form.city_id ? true : false;
			},
			cities() {
				return this.$store.getters.getCities;
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
						let subscriptions = this.$store.getters.userSubscriptions;
						subscriptions.push(response.subscription);
						this.$store.commit('SET_SUBSCRIPTIONS', {subscriptions});
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Vi har lagt till din prenumeration. När en ny tjänst skapas som du prenumererar på kommer du att få ett email om tjänsten.'});
						$("html, body").animate({ scrollTop: 0 }, "fast");
						this.form.reset();
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error);
						this.processing = false;
					})
			}
		}
	}
</script>