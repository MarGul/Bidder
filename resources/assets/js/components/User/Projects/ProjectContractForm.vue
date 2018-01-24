<template>
	<div class="project_contract_form-component">
		
		<form class="form-with-sections">
			<section class="white-contentSection">
				<header class="white-contentSection-header is-gray is-flex v-center">
					<h3 class="flex-1">Projektets avtal</h3>
					<contract-download v-if="project.contracts.length" />
				</header>
				<div class="white-contentSection-content">

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Beställare</div>
							<div class="description-details">
								<p>Personen som har lagt upp tjänsten. Fyll i ditt namn och organisations/-personnummer.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('client_name')}">
								<label class="control-label">
									Namn <span class="req" v-if="serviceRole">*</span>
								</label>
								<input type="text" class="form-control" v-model="form.client_name">
							</div>
							<div class="control-container" :class="{'has-errors': form.errors.has('client_identity')}">
								<label class="control-label">
									Organisations/-personnummer <span class="req" v-if="serviceRole">*</span>
								</label>
								<input type="text" class="form-control" v-model="form.client_identity">
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Utförare</div>
							<div class="description-details">
								<p>Personen som har lagt det vinnande budet. Fyll i ditt namn och organisations/-personnummer.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('contractor_name')}">
								<label class="control-label">
									Namn <span class="req" v-if="!serviceRole">*</span>
								</label>
								<input type="text" class="form-control" v-model="form.contractor_name">
							</div>
							<div class="control-container" :class="{'has-errors': form.errors.has('contractor_identity')}">
								<label class="control-label">
									Organisations/-personnummer <span class="req" v-if="!serviceRole">*</span>
								</label>
								<input type="text" class="form-control" v-model="form.contractor_identity">
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Projektets beskrivning</div>
							<div class="description-details">
								<p>En tydlig beskrivning av det arbete som ska utföras.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('project_description')}">
								<label class="control-label">
									Beskrivning <span class="req">*</span>
								</label>
								<textarea rows="6" class="form-control" v-model="form.project_description"></textarea>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Utförarens avårdande</div>
							<div class="description-details">
								<p>Arbete som beställaren vill ha utfört trots att utföraren har avrått.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('contractor_dissuasion')}">
								<label class="control-label">Avrådande</label>
								<textarea rows="4" class="form-control" v-model="form.contractor_dissuasion"></textarea>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Tider</div>
							<div class="description-details">
								<p>Fyll i datum för när arbetet ska påbörjas och vara avslutat.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('project_start')}">
								<label class="control-label">
									Arbetet ska påbörjas <span class="req">*</span>
								</label>
								<datepicker
									input-class="form-control" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.project_start"
								></datepicker>
							</div>
							<div class="control-container" :class="{'has-errors': form.errors.has('project_end')}">
								<label class="control-label">
									Arbetet ska vara slutfört <span class="req">*</span>
								</label>
								<datepicker
									input-class="form-control" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.project_end"
								></datepicker>
							</div>
						</div>
					</div>
					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Pris</div>
							<div class="description-details">
								<p>Fyll i totalsumman för arbetet.</p>
								<p>
									I rutan specificeras kan du fylla i bland annat moms, RUT, eller på 
									annat sätt specificera totalsumman. Tänk på att specificera de resekostnader som krävs för att utföra arbetet. 
								</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<div class="control-container" :class="{'has-errors': form.errors.has('project_price')}">
									<label class="control-label">
										Totalsumma ink. moms <span class="req">*</span>
									</label>
									<input type="text" class="form-control" v-model="form.project_price">
								</div>
								<div class="control-container" :class="{'has-errors': form.errors.has('project_price_specified')}">
									<label class="control-label">Specificerat</label>
									<textarea rows="4" class="form-control" v-model="form.project_price_specified"></textarea>
								</div>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Betalning</div>
							<div class="description-details">
								<p>
									Här beslutar ni om hur betalningen för arbetet ska hanteras. 
									Om ni vill avtala om något annat kring betalning så ska det skrivas under rubriken övrigt.
								</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container mb30" :class="{'has-errors': form.errors.has('payment_full') || form.errors.has('payment_specified')}">
								<label class="control-label">Betalningsalternativ</label>
								<div class="checkbox">
									<label>
										<input type="checkbox" v-model="form.payment_full"> Hela beloppet betalas när arbetet är slutfört.
									</label>
								</div>
								<div class="checkbox">
									<label>
										<input type="checkbox" v-model="form.payment_specified"> Beställaren vill ha en specificerad faktura.
									</label>
								</div>
							</div>
							<div class="is-weight-500 mb3 is-small-text">Om ni ej avtal om något annat så gäller följande:</div>
							<ul class="m0 pl15 is-extra-small-text">
								<li>Arbeten som anges i fakturan ska vara slutförda när faktureringen sker.</li>
								<li>Fakturan ska betalas inom 30 dagar efter beställaren mottagit fakturan.</li>
								<li>Om betalningen ej sker inom rätt tid ska beställaren betala dröjsmålsränta enligt räntelagen.</li>
							</ul>
						</div>
					</div>

					<div class="form-section no-border">
						<div class="form-section-description">
							<div class="description-header">Övrigt</div>
							<div class="description-details">
								<p>Här kan ni avtala om allt som inte passade in de andra rubrikerna.</p>
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('other')}">
								<label class="control-label">Övrigt</label>
								<textarea rows="4" class="form-control" v-model="form.other"></textarea>
							</div>
						</div>
					</div>

				</div>
				<footer class="white-contentSection-footer">
					<div class="other-accepted-contract">
						<div class="is-flex c_c gray-sub-text">
							<template v-if="other.pivot.contract_accepted">
								<i class="icon icon_confirmed wh12 mr5"></i> {{ other.username }} har godkänt avtalet
							</template>
							<template v-else>
								<i class="icon icon_decline wh12 mr5"></i> {{ other.username }} har inte godkänt avtalet
							</template>
						</div>
					</div>
					<div class="btn-accept-contract">
						<button 
							type="submit" 
							class="btn btn-success"
							:disabled="!!me.pivot.contract_accepted"
							v-text="!!me.pivot.contract_accepted ? 'Har godkänt' : 'Godkänn avtalet'"
							@click.prevent="accept"	
						/>
					</div>
					<div class="btn-update-contract">
						<button 
							type="submit" 
							class="btn btn-primary" 
							:class="{processing}" 
							:disabled="processing"
							v-text="'Uppdatera avtalet'"
							@click.prevent="update"
						/>
					</div>		
				</footer>
			</section>
		</form>

	</div>
</template>

<script>
	import contractDownload from './ProjectDownloadContract';
	import Form from '../../../includes/classes/Form';
	import Model from '../../../includes/Model';
	import datepicker from 'vuejs-datepicker';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			datepicker,
			contractDownload
		},
		data() {
			return {
				form: new Form({
					project_id: '',
					client_name: '',
					client_identity: '',
					contractor_name: '', 
					contractor_identity: '', 
					project_description: '',
			        contractor_dissuasion: '', 
			        project_start: '', 
			        project_end: '', 
			        project_price: '',
			        project_price_specified: '',
			        payment_full: '', 
			        payment_specified: '', 
			        other: ''
				}),
				contract_id: null,
				processing: false,
			}
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails',
				auth: 'authUser'
			}),
			updating() {
				// Are we updating an existing contract?
				return this.contract_id ? true : false;
			},
			me() {
				return this.project.users.find(u => u.id === this.auth.id);
			},
			other() {
				return this.project.users.find(u => u.id !== this.auth.id);
			},
			serviceRole() {
				return this.me.pivot.role === 'service';
			},
			canAccept() {
				if ( !this.project.contracts.length ) return false;

				if ( this.serviceRole ) {
					// If you have the service role and haven't filled out your information.
					if ( !this.project.contracts[0].client_name || !this.project.contracts[0].client_identity ) {
						return false;
					}
				} else {
					if ( !this.project.contracts[0].contractor_name || !this.project.contracts[0].contractor_identity ) {
						return false;
					}
				}

				return true; 
			}
		},
		methods: {
			update() {
				this.processing = true;
				let requestUrl = this.updating ? `contracts/${this.contract_id}` : 'contracts';
				let requestMethod = this.updating ? 'patch' : 'post';

				new Model(requestUrl)[requestMethod](this.form.asDate(['project_start', 'project_end']).data())
					.then(response => {
						this.$store.dispatch('projectContractUpdated', {contract: response.data.contract, history: response.data.history});
						this.processing = false;
						this.updating = true;
						this.contract_id = response.data.contract.id;
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Vi har uppdaterat avtalet! Du kan nu godkänna avtalet.'
						});
						document.body.scrollTop = document.documentElement.scrollTop = 0;
						this.form.errors.clear();
					})
					.catch(error => {
						document.body.scrollTop = document.documentElement.scrollTop = 0;
						this.form.errors.record(error.errors);
						this.processing = false;
						this.$store.dispatch('showNotification', {type: 'error', msg: 'Valideringsfel. Var vänlig och korrigera fälten med röd text.'});
					});

			},
			accept() {
				// If the user is not allowed to accept the contract yet.
				// Then we will show an alert. A user can not accept the contract yet if it
				// hasn't yet been stored with the required fields.
				if ( !this.canAccept ) {
					this.$store.dispatch('openModal', {
						component: 'alert',
						data: {
							alertText: `Innan du kan godkänna avtalet så behöver du fylla i de uppgifter som är obligatoriska för dig
										och uppdatera avtalet.
										De uppgifter som är obligatoriska för dig är märkta med en röd stjärna.`
						}
					});

					return;
				}
				
				this.$store.dispatch('openModal', {
					component: 'confirm',
					data: {
						confirmText: 'Är du säker på att du vill godkänna avtalet?',
						onConfirm: () => {
							new Model(`contracts/${this.contract_id}/accept`).put()
								.then(response => {
									this.$store.dispatch('showNotification', {type: 'success', msg: 'Du har nu godkänt avtalet!'});
									// Update the state of the project
									this.$store.dispatch('projectContractAccepted', {
										userAcceptedId: response.data.userAcceptedId,
										history: response.data.history
									});

									this.$store.dispatch('closeModal');
									document.body.scrollTop = document.documentElement.scrollTop = 0;
								})
								.catch(error => {
									console.log(error);
								});
						}
					}
				});
			},
			initCreateContract() {         
				this.form.project_id = this.project.id;
                // Load in data from the project details.
				this.form.client_name = this.project.users.find(u => u.pivot.role === 'service').name;
                this.form.contractor_name = this.project.users.find(u => u.pivot.role === 'bid').name;
				this.form.project_start = this.project.service_start;
				this.form.project_end = this.project.service_end;
				this.form.project_price = this.project.service_price;
			},
			initUpdateContract() {
				// Get the contract from storage.
				let contract = this.project.contracts[0];
				// Save the contract id.
				this.contract_id = contract.id;
				// Set the form to the contracts details
				this.form.project_id = contract.project_id;
				this.form.client_name = contract.client_name;
				this.form.client_identity = contract.client_identity;
				this.form.contractor_name = contract.contractor_name;
				this.form.contractor_identity = contract.contractor_identity;
				this.form.project_description = contract.project_description;
				this.form.contractor_dissuasion = contract.contractor_dissuasion;
				this.form.project_start = contract.project_start;
				this.form.project_end = contract.project_end;
				this.form.project_price = contract.project_price;
				this.form.project_price_specified = contract.project_price_specified;
				this.form.payment_full = contract.payment_full;
				this.form.payment_specified = contract.payment_specified;
				this.form.other = contract.other;

			}
		},
		created() {
			if ( this.project.contracts.length ) {
				this.initUpdateContract();
			} else {
				this.initCreateContract();
			}
		}
	}
</script>