<template>
	<div class="edit_service_form-component">

		<form :class="{loading: !fetched}" @keydown="form.errors.clear()">
			<div class="row">
				<div class="col-xs-12">
					<div class="form-group" :class="{'has-error': form.errors.has('title')}">
						<label class="control-label">Titel</label>
						<input type="text" class="form-control" v-model="form.title">
						<span class="help-block" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('category_id')}">
						<label class="control-label">Kategori</label>
						<select class="form-control" v-model="form.category_id">
							<option value="">Välj kategori</option>
							<optgroup :label="rootCat.name" v-for="rootCat in categories">
								<option :value="category.id" v-text="category.name" v-for="category in rootCat.sub_categories"></option>
							</optgroup>
						</select>
						<span class="help-block" v-if="form.errors.has('category_id')" v-text="form.errors.get('category_id')"></span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('region_id')}">
						<label class="control-label">Region</label>
						<select class="form-control" v-model="form.region_id">
							<option value="">Välj region</option>
							<option :value="region.id" v-text="region.name" v-for="region in regions"></option>
						</select>
						<span class="help-block" v-if="form.errors.has('region_id')" v-text="form.errors.get('region_id')"></span>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('city')}">
						<label class="control-label">Stad</label>
						<select class="form-control" :disabled="!form.region_id" v-model="form.city_id">
							<option value="">Välj stad</option>
							<option :value="city.id" v-text="city.name" v-for="city in cities"></option>
						</select>
						<span class="help-block" v-if="form.errors.has('city')" v-text="form.errors.get('city')"></span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('start')}">
						<label class="control-label">Påbörja utförandet</label>
						<datepicker
							input-class="form-control"  
							language="sv"
							:monday-first="true"
							:disabled="{to: new Date()}"
							v-model="form.start"
						></datepicker>
						<span class="help-block" v-if="form.errors.has('start')" v-text="form.errors.get('start')"></span>
						<small>När vill du att tjänsten ska påbörjas?</small>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('end')}">
						<label class="control-label">Avsluta utförandet</label>
						<datepicker
							input-class="form-control" 
							language="sv"
							:monday-first="true"
							:disabled="{to: new Date()}"
							v-model="form.end"
						></datepicker>
						<span class="help-block" v-if="form.errors.has('end')" v-text="form.errors.get('end')"></span>
						<small>När vill du att tjänsten ska avslutas?</small>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12">
					<div class="form-group" :class="{'has-error': form.errors.has('description')}">
						<label class="control-label">Beskrivning</label>
						<textarea rows="10" class="form-control" v-model="form.description"></textarea>
						<span class="help-block" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
					</div>
				</div>
			</div>
		</form>

	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/Model";
	import datepicker from 'vuejs-datepicker';

	export default {
		components: {
			datepicker
		},
		data() {
			return {
				form: new Form({
					title: '',
					rootCategory: '',
					category_id: '',
					region_id: '',
					city_id: '',
					start: '',
					end: '',
					description: ''
				}),
				fetched: false
			}
		},
		computed: {
			categories() {
				return this.$store.getters.getCategories;
			},
			regions() {
				return this.$store.getters.getRegions;
			},
			cities() {
				return this.$store.getters.getRegionById(this.form.region_id).cities;
			}
		},
		created() {
			new Model(`user/services/${this.$route.params.id}`).get()
				.then(response => {
					this.form.title = response.service.title;
					this.form.category_id = response.service.category_id;
					this.form.region_id = response.service.region_id;
					this.form.city_id = response.service.city_id;
					this.form.start = response.service.start;
					this.form.end = response.service.end;
					this.form.description = response.service.description;
					this.fetched = true;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
</script>