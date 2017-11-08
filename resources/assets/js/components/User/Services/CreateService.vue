<template>
	<div class="create_service-component">
		
		<form class="form-with-sections" @submit.prevent="create">
			<section class="white-contentSection">
				<header class="white-contentSection-header">
					<h3>Skapa en ny tjänst</h3>
				</header>
				<div class="white-contentSection-content">

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Tjänstens detaljer</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container half-width" :class="{'has-errors': form.errors.has('category_id')}">
								<label class="control-label">Kategori</label>
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

							<div class="control-container half-width" :class="{'has-errors': form.errors.has('region_id')}">
								<label class="control-label">Region</label>
								<select class="form-control" v-model="form.region_id">
									<option value="">Välj region</option>
									<option 
										v-for="region in regions"
										:key="region.slug"
										:value="region.id" 
										v-text="region.name"
									></option>
								</select>
								<span class="help-block" v-if="form.errors.has('region_id')" v-text="form.errors.get('region_id')"></span>
							</div>

							<div class="control-container half-width" :class="{'has-errors': form.errors.has('city_id')}">
								<label class="control-label">Stad</label>
								<select class="form-control" :disabled="!form.region_id" v-model="form.city_id">
									<option value="">Välj stad</option>
									<option 
										:key="city.slug"
										v-for="city in cities"
										:value="city.id" 
										v-text="city.name"
									></option>
								</select>
								<span class="help-block" v-if="form.errors.has('city_id')" v-text="form.errors.get('city_id')"></span>
							</div>
						</div>
					</div>

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

					<div class="form-section" v-if="checklistItemsActive.length > 0">
						<div class="form-section-description">
							<div class="description-header">Har du tänkt på?</div>
							<div class="description-details">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo.</div>
						</div>
						<div class="form-section-controls">
							<mg-checklist
								:items="checklistItemsActive"
								:error="checklistError"
								ref="checklist"
								class="mtb15"
								@accepted="updateChecklistAccepted"
							/>
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
							<div class="control-container half-width" :class="{'has-errors': form.errors.has('start')}">
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

							<div class="control-container half-width" :class="{'has-errors': form.errors.has('end')}">
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

							<div class="control-container half-width" :class="{'has-errors': form.errors.has('bidding')}">
								<label class="control-label">Dagar för budgivning</label>
								<select class="form-control" v-model.number="form.bidding">
									<option value="">Välj antal dagar för budgivning</option>
									<option value="7">7</option>
									<option value="14">14</option>
									<option value="30">30</option>
									<option value="60">60</option>
								</select>
								<span class="help-block" v-if="form.errors.has('bidding')" v-text="form.errors.get('bidding')"></span>
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
								:media="media" 
								:errors="mediaErrors" 
								@added="mediaAdded" 
								@removed="mediaRemoved" 
								:disabled="processing">
							</app-upload-media>
						</div>
					</div>
				</div>
				<footer class="white-contentSection-footer">
					<button type="submit" class="btn btn-primary" :class="{processing}">
						Skapa tjänst
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
	import MgChecklist from '../../Includes/Checklist';

	export default {
		components: {
			datepicker,
			appUploadMedia,
			MgChecklist
		},
		data() {
			return {
				form: new Form({
					title: '',
					description: '',
					category_id: '',
					region_id: '',
					city_id: '',
					start: '',
					end: '',
					bidding: ''
				}),
				media: [],
				mediaErrors: [],
				checklistItems: {},
				checklistAccepted: true,
				checklistError: false,
				processing: false
			}
		},

		watch: {
			checklistItemsActive() {
				if ( this.checklistItemsActive.length > 0 ) {
					this.checklistAccepted = false;
				}
			}
		},

		computed: {

			...mapGetters({
				categories: 'categories',
				regions: 'regions',
				regionById: 'regionById'
			}),

			cities() {
				let region = this.regionById(this.form.region_id);
				return region ? region.cities : [];
			},

			checklistItemsActive() {
				return this.checklistItems[this.form.category_id] || [];
			},

			finalData() {
				const formData = new FormData();
				let data = this.form.asDate(['start', 'end']).data();
				
				for ( let key in data ) {
					formData.append(key, data[key]);
				}
				
				// Append the media if there is any.
				for (var i = 0; i < this.media.length; i++) {
					formData.append('media[]', this.media[i]);
				}
				
				return formData;
			}
		},

		methods: {
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

			updateChecklistAccepted(accepted) {
				this.checklistAccepted = accepted;
			},

			create() {
				// If the checklist isn't accepted don't proceed.
				if ( !this.checklistAccepted ) {
					this.$refs.checklist.$el.scrollIntoView();
					this.checklistError = true;
					return;
				}

				this.processing = true;
				this.checklistError = false;
				new Model('user/services').create(this.finalData)
					.then(response => {
						this.form.reset();
						this.media = [];
						this.mediaErrors = [];
						// Break the cache
						this.$store.commit('SET_USER_SERVICES_FETCHED', false);
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Woohoo! Vi skapade din tjänst.'});
						window.scrollTo(0,0);
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
						window.scrollTo(0,0);
						this.processing = false;
					});
			}
		},

		created() {
			new Model('checklist-items').get()
				.then(response => {
					this.checklistItems = response.data.checklistItems;
				})
				.catch(error => { console.log(error); })
		}
	}
</script>