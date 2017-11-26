<template>
	<div class="project_contract_form-component">
		
		<form class="form-with-sections" @submit.prevent="send">
			<section class="white-contentSection">
				<header class="white-contentSection-header is-gray is-flex v-center">
					<h3 class="flex-1">Projektets avtal</h3>
					<contract-download />
				</header>
				<div class="white-contentSection-content">

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Beställare</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('client_name')}">
								<label class="control-label">Namn</label>
								<input type="text" class="form-control" v-model="form.client_name">
							</div>
							<div class="control-container" :class="{'has-errors': form.errors.has('client_identity')}">
								<label class="control-label">Organisations/-personnummer</label>
								<input type="text" class="form-control" v-model="form.client_identity">
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Utförare</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('contractor_name')}">
								<label class="control-label">Namn</label>
								<input type="text" class="form-control" v-model="form.contractor_name">
							</div>
							<div class="control-container" :class="{'has-errors': form.errors.has('contractor_identity')}">
								<label class="control-label">Organisations/-personnummer</label>
								<input type="text" class="form-control" v-model="form.contractor_identity">
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Projektets beskrivning</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('project_description')}">
								<label class="control-label">Beskrivning</label>
								<textarea rows="6" class="form-control" v-model="form.project_description"></textarea>
							</div>
						</div>
					</div>

					<div class="form-section">
						<div class="form-section-description">
							<div class="description-header">Utförarens avårdande</div>
							<div class="description-details">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
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
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container" :class="{'has-errors': form.errors.has('project_start')}">
								<label class="control-label">Arbetet ska påbörjas</label>
								<datepicker
									input-class="form-control" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.project_start"
								></datepicker>
							</div>
							<div class="control-container" :class="{'has-errors': form.errors.has('project_end')}">
								<label class="control-label">Arbetet ska vara slutfört</label>
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
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
							</div>
						</div>
						<div class="form-section-controls">
							<div class="control-container">
								<div class="control-container" :class="{'has-errors': form.errors.has('project_price')}">
									<label class="control-label">Totalsumma</label>
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
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
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
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit
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
					<button type="submit" class="btn btn-primary" :class="{processing}" :disabled="processing">
						Uppdatera avtalet
					</button>
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
				project: 'userProjectDetails'
			}),
			updating() {
				// Are we updating an existing contract?
				return this.contract_id ? true : false;
			}
		},
		methods: {
			send() {
				this.processing = true;
				let requestUrl = this.updating ? `contracts/${this.contract_id}` : 'contracts';
				let requestMethod = this.updating ? 'patch' : 'post';

				new Model(requestUrl)[requestMethod](this.form.asDate(['project_start', 'project_end']).data())
					.then(response => {
						this.$store.dispatch('projectContractUpdated', {contract: response.data.contract, history: response.data.history});
						this.processing = false;
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Vi har uppdaterat avtalet!'});
						window.scrollTo(0,0);
					})
					.catch(error => {
						this.form.errors.record(error.errors);
						this.processing = false;
						window.scrollTo(0,0);
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