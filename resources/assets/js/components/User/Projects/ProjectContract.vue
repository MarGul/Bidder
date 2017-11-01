<template>
	<div class="project_contract-component">
		
		<form class="form-with-sections" @submit.prevent="update">
			<section class="white-contentSection">
				<header class="white-contentSection-header">
					<h3>Projektets avtal</h3>
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
					<button type="submit" class="btn btn-primary" :class="{processing}">
						Uppdatera avtalet
					</button>
				</footer>
			</section>
		</form>

	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from '../../../includes/Model';
	import datepicker from 'vuejs-datepicker';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			datepicker
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
				processing: false
			}
		},
		computed: {
			...mapGetters({
				project: 'userProjectDetails'
			})
		},
		methods: {
			update() {
				this.processing = true;
				new Model('contracts').post(this.form.asDate(['project_start', 'project_end']).data())
					.then(response => {
						console.log(response);
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error);
						this.processing = false;
						window.scrollTo(0,0);
					})

			}
		},
		created() {
			this.form.project_id = this.project.id;
		}
	}
</script>