<template>
	<div class="create_service-component">
		
		<div class="alert alert-danger text-left is-small-text" v-if="!user.email_verified">
			<div class="mb10"><strong>Din email är inte verifierad.</strong></div>
			Var vänlig och verifiera din email innan du skapar en ny tjänst. Detta är för din, våran och våra användares säkerhet.
			Du kan skicka email verifikationen igen under <router-link class="is-link" :to="'/user/profile'">din profil</router-link>
		</div>

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
								<p>Välj vilken kategori tjänsten tillhör och även var någonstans tjänsten skall utföras.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container half-width" :class="{'has-errors': form.errors.has('category_id')}">
								<label class="control-label">Kategori <span class="req">*</span></label>
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
								<label class="control-label">Region <span class="req">*</span></label>
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
								<label class="control-label">Stad <span class="req">*</span></label>
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
								<p>Beskriv så detaljerat du kan vad det är för tjänst du vill ha utförd.</p> 
								<p>Tänk på att ju mer detaljerad beskrivning på tjänsten desto lättare är det för andra användare att lägga ett så korrekt bud som möjligt.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container full-width" :class="{'has-errors': form.errors.has('title')}">
								<label class="control-label">Titel <span class="req">*</span></label>
								<input type="text" class="form-control" v-model="form.title">
								<span class="help-block" v-if="form.errors.has('title')" v-text="form.errors.get('title')"></span>
							</div>

							<div class="control-container full-width" :class="{'has-errors': form.errors.has('description')}">
								<label class="control-label">Beskrivning <span class="req">*</span></label>
								<textarea rows="10" class="form-control" v-model="form.description"></textarea>
								<span class="help-block" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
							</div>
						</div>
					</div>

					<div class="form-section" v-if="checklistItemsActive.length > 0">
						<div class="form-section-description">
							<div class="description-header">Har du tänkt på?</div>
							<div class="description-details">
								<p>Viktiga saker som din beskrivning bör innehålla för att få ett så korrekt bud som möjligt.</p>
								<p>Kryssa i rutorna för att bekräfta att du inte har glömt något viktig information i beskrivningen.</p>
							</div>
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
								<p>Ange datum du vill att tjänsten skall bli påbörjad och även när du vill att den ska vara slutförd.</p>
								<p>Ange hur många dagar från det att du skapar tjänsten tills att budgivningen blir avslutad.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container half-width" :class="{'has-errors': form.errors.has('start')}">
								<label class="control-label">Påbörja tjänsten <span class="req">*</span></label>
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
								<label class="control-label">Avsluta tjänsten <span class="req">*</span></label>
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
								<label class="control-label">Dagar för budgivning <span class="req">*</span></label>
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
								<p>Har du bilder, ritningar eller annan media som du vill lägga till i beskrivningen av din tjänst?</p>
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
					<button 
						type="submit" 
						class="btn btn-primary" 
						:class="{processing}"
						:disabled="processing || !user.email_verified"
						v-text="'Skapa tjänst'"
					/>
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
				regionById: 'regionById',
				user: 'authUser'
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
					this.$store.dispatch('showNotification', {
						type: 'error', 
						msg: 'Var vänlig och kryssa i att du tagit del av "Har du tänkt på?"'
					});
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
						// Push the user to the newly created service.
						this.$router.push(`/services/${response.data.service.id}`);
					})
					.catch(error => {
						this.form.errors.record(error.errors);
						this.mediaErrors = [];
						// Log the media errors seperatly.
						for ( let key in error.errors) {
							if ( key.includes('media') ) {
								let index = key.split('.')[1];
								this.mediaErrors[index] = error.errors[key]; 
							}
						}
						this.$store.dispatch('showNotification', {type: 'error', msg: 'Valideringsfel. Var vänlig och korrigera fälten med röd text.'});
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