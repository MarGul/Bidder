<template>
	<div class="project_contract_display-component">
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
						<div class="control-container">
							<label class="control-label">Namn</label>
							<div class="input-data">{{ contract.client_name }}</div>
						</div>
						<div class="control-container">
							<label class="control-label">Organisations/-personnummer</label>
							<div class="input-data">{{ contract.client_identity }}</div>
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
						<div class="control-container">
							<label class="control-label">Namn</label>
							<div class="input-data">{{ contract.contractor_name }}</div>
						</div>
						<div class="control-container">
							<label class="control-label">Organisations/-personnummer</label>
							<div class="input-data">{{ contract.contractor_identity }}</div>
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
						<div class="control-container">
							<label class="control-label">Beskrivning</label>
							<div class="input-data">{{ contract.project_description }}</div>
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
						<div class="control-container">
							<label class="control-label">Avrådande</label>
							<div class="input-data">{{ contract.contractor_dissuasion }}</div>
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
						<div class="control-container">
							<label class="control-label">Arbetet ska påbörjas</label>
							<div class="input-data">{{ contract.project_start }}</div>
						</div>
						<div class="control-container">
							<label class="control-label">Arbetet ska vara slutfört</label>
							<div class="input-data">{{ contract.project_end }}</div>
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
							<div class="control-container">
								<label class="control-label">Totalsumma</label>
								<div class="input-data">{{ filters.currency(contract.project_price) }}</div>
							</div>
							<div class="control-container">
								<label class="control-label">Specificerat</label>
								<div class="input-data">{{ contract.project_price_specified }}</div>
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
						<div class="control-container mb30">
							<label class="control-label">Betalningsalternativ</label>
							<div class="input-data">
								<ul>
									<li v-if="contract.payment_full">Hela beloppet betalas när arbetet är slutfört.</li>
									<li v-if="contract.payment_specified">Beställaren vill ha en specificerad faktura.</li>
								</ul>
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
						<div class="control-container">
							<label class="control-label">Övrigt</label>
							<div class="input-data">{{ contract.other }}</div>
						</div>
					</div>
				</div>

			</div>
		</section>
	</div>
</template>

<script>
    import contractDownload from './ProjectDownloadContract';
    import { mapGetters } from 'vuex';

    export default {
    	components: {
    		contractDownload
    	},
    	computed: {
    		...mapGetters({
    			project: 'userProjectDetails'
    		}),
    		contract() {
    			return this.project.contracts[0];
    		}
    	}
    }
</script>