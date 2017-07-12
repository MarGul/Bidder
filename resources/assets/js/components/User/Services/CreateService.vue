<template>
	<div class="create_service-component">

		<h1 class="user-component-title">Skapa Tjänst</h1>
		
		<form @keydown="form.errors.clear()">
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
					<div class="form-group" :class="{'has-error': form.errors.has('category')}">
						<label class="control-label">Huvudkategori</label>
						<select class="form-control" v-model="form.rootCategory">
							<option value="">Välj huvudkategori</option>
							<option :value="category" v-text="category.name" v-for="category in categories"></option>
						</select>
						<span class="help-block" v-if="form.errors.has('category')" v-text="form.errors.get('category')"></span>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('category')}">
						<label class="control-label">Kategori</label>
						<select class="form-control" :disabled="!form.rootCategory" v-model="form.category">
							<option value="">Välj kategori</option>
							<option :value="sub.id" v-text="sub.name" v-for="sub in form.rootCategory.sub_categories"></option>
						</select>
						<span class="help-block" v-if="form.errors.has('category')" v-text="form.errors.get('category')"></span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('region')}">
						<label class="control-label">Region</label>
						<select class="form-control" v-model="form.region">
							<option value="">Välj region</option>
							<option :value="region" v-text="region.name" v-for="region in regions"></option>
						</select>
						<span class="help-block" v-if="form.errors.has('region')" v-text="form.errors.get('region')"></span>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('city')}">
						<label class="control-label">Stad</label>
						<select class="form-control" :disabled="!form.region" v-model="form.city">
							<option value="">Välj stad</option>
							<option :value="city.id" v-text="city.name" v-for="city in form.region.cities"></option>
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
				<div class="col-xs-12 col-sm-6">
					<div class="form-group" :class="{'has-error': form.errors.has('bidding')}">
						<label class="control-label">Budgivning</label>
						<select class="form-control" v-model.number="form.bidding">
							<option value="">Välj antal dagar för budgivning</option>
							<option value="7">7</option>
							<option value="14">14</option>
							<option value="30">30</option>
							<option value="60">60</option>
						</select>
						<span class="help-block" v-if="form.errors.has('bidding')" v-text="form.errors.get('bidding')"></span>
						<small>Hur många dagar ska budgivningen pågå?</small>
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

			<app-upload-media 
				:media="media" 
				:errors="mediaErrors" 
				@added="mediaAdded" 
				@removed="mediaRemoved" 
				:disabled="processing">
			</app-upload-media>

			<div class="form-group">
				<button 
					class="btn btn-primary full-width"
					:class="{'processing': processing}" 
					@click.prevent="create"
					:disabled="processing || this.form.errors.any()"
				>Skapa din tjänst</button> 
			</div>
		</form>

	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/Model";
	import datepicker from 'vuejs-datepicker';
	import appUploadMedia from './UploadMedia';

	export default {
		components: {
			datepicker,
			appUploadMedia
		},
		data() {
			return {
				form: new Form({
					title: '',
					rootCategory: '',
					category: '',
					region: '',
					city: '',
					start: '',
					end: '',
					bidding: '',
					description: ''
				}),
				media: [],
				mediaErrors: [],
				processing: false
			}
		},
		computed: {
			categories() {
				return this.$store.getters.getCategories;
			},
			regions() {
				return this.$store.getters.getRegions;
			},
			finalData() {
				const formData = new FormData();
				
				formData.append('title', this.form.title);
				formData.append('category', this.form.category);
				formData.append('region', this.form.region || '');
				formData.append('city', this.form.city);
				formData.append('start', this.stripTime(this.form.start));
				formData.append('end', this.stripTime(this.form.start));
				formData.append('bidding', this.form.bidding);
				formData.append('description', this.form.description);
				
				// Append the media if there is any.
				for (var i = 0; i < this.media.length; i++) {
					formData.append('media[]', this.media[i]);
				}

				return formData;
			}
		},
		methods: {
			stripTime(date) {
				return (date instanceof Date) ? `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}` : date;
			},
			pad(number) {
				return ( number < 10 ) ? "0" + number : number;
			},
			mediaAdded({files}) {
				for (let i = 0; i < files.length; i++) {
					this.media.push(files[i]);
				}
			},
			mediaRemoved({index}) {
				this.media.splice(index, 1);
				if ( this.mediaErrors[index] ) {
					this.mediaErrors.splice(index, 1);
				}
			},
			create() {
				this.processing = true;
				new Model('services').create(this.finalData)
					.then(response => {
						this.form.reset();
						this.media = [];
						this.mediaErrors = [];
						// Break the cache
						this.$store.commit('SET_SERVICES_FETCHED', {fetched: false});
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Woohoo! Vi skapade din tjänst.'});
						$("html, body").animate({ scrollTop: 0 }, "fast");
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error);
						this.mediaErrors = [];
						// Log the media errors seperatly.
						for ( let key in error) {
							if ( key.includes('media') ) {
								let index = key.split('.')[1];
								this.mediaErrors[index] = error[key]; 
							}
						}
						this.processing = false;
					});
			}
		}
	}
</script>