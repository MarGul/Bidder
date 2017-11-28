<template>
	<div class="edit_service_form-component">

		<form class="form-with-sections" :class="{loading: !fetched}" @submit.prevent="update">
			<section class="white-contentSection">
				<header class="white-contentSection-header">
					<h3>Redigera tjänst</h3>
				</header>
				<div class="white-contentSection-content">
					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Tjänstens innehåll</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container full-width" :class="{'has-errors': form.errors.has('title')}">
								<label class="control-label">Titel</label>
								<input type="text" class="form-control" v-model="form.title">
								<span class="help-block" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></span>
							</div>

							<div class="control-container full-width" :class="{'has-errors': form.errors.has('description')}">
								<label class="control-label">Beskrivning</label>
								<textarea rows="10" class="form-control" v-model="form.description"></textarea>
								<span class="help-block" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Tjänstens detaljer</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('category_id')}">
								<label class="control-label">Kategori</label>
								<select class="form-control" v-model="form.category_id">
									<option value="">Välj kategori</option>
									<optgroup :label="rootCat.name" v-for="rootCat in categories">
										<option :value="category.id" v-text="category.name" v-for="category in rootCat.sub_categories"></option>
									</optgroup>
								</select>
								<span class="help-block" v-if="form.errors.has('category_id')" v-text="form.errors.get('category_id')"></span>
							</div>

							<div class="control-container" :class="{'has-errors': form.errors.has('region_id')}">
								<label class="control-label">Region</label>
								<select class="form-control" v-model="form.region_id">
									<option value="">Välj region</option>
									<option :value="region.id" v-text="region.name" v-for="region in regions"></option>
								</select>
								<span class="help-block" v-if="form.errors.has('region_id')" v-text="form.errors.get('region_id')"></span>
							</div>

							<div class="control-container" :class="{'has-errors': form.errors.has('city_id')}">
								<label class="control-label">Stad</label>
								<select class="form-control" :disabled="!form.region_id" v-model="form.city_id">
									<option value="">Välj stad</option>
									<option :value="city.id" v-text="city.name" v-for="city in cities"></option>
								</select>
								<span class="help-block" v-if="form.errors.has('city_id')" v-text="form.errors.get('city_id')"></span>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Tjänstens datum</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('start')}">
								<label class="control-label">Påbörja tjänsten</label>
								<datepicker
									input-class="form-control"  
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.start"
								></datepicker>
								<span class="help-block" v-if="form.errors.has('start')" v-text="form.errors.get('start')"></span>
							</div>

							<div class="control-container" :class="{'has-errors': form.errors.has('end')}">
								<label class="control-label">Avsluta tjänsten</label>
								<datepicker
									input-class="form-control" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.end"
								></datepicker>
								<span class="help-block" v-if="form.errors.has('end')" v-text="form.errors.get('end')"></span>
							</div>
						</div>
					</div>

					<div class="form-section no-border">
						<div class="form-section-description">
							<div class="description-header">Tjänstens media</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<app-upload-media 
								:initialMedia="initialMedia"
								:media="media" 
								:errors="mediaErrors" 
								:disabled="processing"
								:editAvailable="true"
								@added="mediaAdded" 
								@deleted="initialMediaRemoved"
								@removed="mediaRemoved"> 
							</app-upload-media>
						</div>
					</div>
				</div>
				<footer class="white-contentSection-footer">
					<button type="submit" class="btn btn-primary" :class="{processing}" :disabled="processing">
						Uppdatera tjänsten
					</button>
				</footer>
			</section>
		</form>

	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/Model";
	import datepicker from 'vuejs-datepicker';
	import appUploadMedia from './UploadMedia';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			datepicker,
			appUploadMedia
		},
		data() {
			return {
				form: new Form({
					title: '',
					category_id: '',
					region_id: '',
					city_id: '',
					start: '',
					end: '',
					description: ''
				}),
				initialMedia: [],
				deletedMedia: [],
				media: [],
				mediaErrors: [],
				processing: false
			}
		},
		computed: {
			...mapGetters({
				fetched: 'serviceDetailsFetched',
				service: 'serviceDetailsService'
			}),

			categories() {
				return this.$store.getters.categories;
			},

			regions() {
				return this.$store.getters.regions;
			},

			cities() {
				let region = this.$store.getters.regionById(this.form.region_id);
				return region ? region.cities : [];
			},

			finalData() {
				const formData = new FormData();
				let data = this.form.asDate(['start', 'end']).data();
				
				formData.append('_method', 'patch');
				for ( let key in data ) {
					formData.append(key, data[key]);
				}
				
				// Append the added media if there is any.
				for ( var i = 0; i < this.media.length; i++ ) {
					formData.append('media[]', this.media[i]);
				}

				// Append the deleted media id's if any
				for (var j = 0; j < this.deletedMedia.length; j++ ) {
					formData.append('deletedMedia[]', this.deletedMedia[j]);
				}

				return formData;
			}
		},
		methods: {
			initialMediaRemoved({id}) {
				// Push the deleted id to media that should be deleted.
				if ( !this.deletedMedia.includes(id) ) {
					this.deletedMedia.push(id);
				}
				// Remove it from the list.
				this.initialMedia.splice(this.initialMedia.findIndex(e => e.id === id), 1);
			},

			mediaAdded({files}) {
				for (let i = 0; i < files.length; i++) {
					this.media.push(files[i]);
				}
			},

			mediaRemoved() {
				this.media.splice(index, 1);
				if ( this.mediaErrors[index] ) {
					this.mediaErrors.splice(index, 1);
				}
			},

			update() {
				this.processing = true;
				new Model(`user/services/${this.$route.params.id}`).post(this.finalData)
					.then(response => {
						this.form.errors.clear();
						// Break the services cache so it reloads with the updated info.
						this.$store.commit('SET_USER_SERVICES_FETCHED', false);
						this.$store.commit('SET_USER_SERVICE_DETAILS_SERVICE', response.data.service);
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Din tjänst har blivit uppdaterad!'});
						window.scrollTo(0,0);
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error.errors);
						this.mediaErrors = [];
						// Log the media errors seperatly.
						for ( let key in error) {
							if ( key.includes('media') ) {
								let index = key.split('.')[1];
								this.mediaErrors[index] = error[key]; 
							}
						}
						window.scrollTo(0,0);
						this.processing = false;
					});
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model(`user/services/${this.$route.params.id}`).get()
					.then(response => {
						this.form.title = response.data.service.title;
						this.form.category_id = response.data.service.category_id;
						this.form.region_id = response.data.service.region_id;
						this.form.city_id = response.data.service.city_id;
						this.form.start = response.data.service.start;
						this.form.end = response.data.service.end;
						this.form.description = response.data.service.description;
						this.initialMedia = response.data.service.media;
						this.$store.commit('SET_USER_SERVICE_DETAILS_FETCHED', true);
						this.$store.commit('SET_USER_SERVICE_DETAILS_SERVICE', response.data.service);
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				this.form.title = this.service.title;
				this.form.category_id = this.service.category_id;
				this.form.region_id = this.service.region_id;
				this.form.city_id = this.service.city_id;
				this.form.start = this.service.start;
				this.form.end = this.service.end;
				this.form.description = this.service.description;
				this.initialMedia = this.service.media;
			}
		}
	}
</script>