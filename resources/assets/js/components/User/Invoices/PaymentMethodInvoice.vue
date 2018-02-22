<template>
	<div class="payment_method_invoice-component">
		<div class="payment-method-container arrow-right">
			<h4>Betala via bankgiro</h4>
			<p class="is-small-text">
				Om du inte vill betala med kort så kan vi skicka en seperat faktura till dig. Vi kommer att skicka fakturan
				till den email-adressen som du registrerade dig med.
			</p>
			<p class="is-small-text">
				Fakturan kommer att bli manuellt behandlat så det kan ta upp till 48 timmar innan vi har skickat fakturan till dig.
			</p>

			<textarea
				rows="2"
				class="form-control"
				placeholder="Valfri text som kommer att synas på fakturan"
				v-model="notes"
			/>

			<div class="alert alert-danger mt10" v-if="error" v-text="errorMessage"></div>

			<button 
				type="submit"
				class="btn btn-primary mt15"
				:class="{processing}"
				:disabled="processing"
				v-text="'Skicka faktura'"
				@click.prevent="submit"
			/>
		</div>
	</div>
</template>

<script>
	import Model from '../../../includes/Model';

	export default {
		props: {
			invoiceId: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				notes: '',
				processing: false,
				error: false,
				errorMessage: ''
			}
		},
		methods: {
			submit() {
				this.processing = true;

				new Model('payments/invoice').post({invoice: this.invoiceId, notes: this.notes})
					.then(response => {
						let invoices = this.$store.getters.userInvoices;
						for ( let i = 0; i < invoices.length; i++) {
							if ( invoices[i].id === this.invoiceId ) {
								invoices[i].payment = response.data.payment;
							}
						}
						this.$store.commit('SET_USER_INVOICES', invoices);
						
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Förfrågan mottagen. Vi skickar en faktura till dig inom kort.'
						});

						this.message = '';
					})
					.catch(error => {
						this.error = true;
						this.errorMessage = error.message;
					})
					.finally(() => this.processing = false );
			}
		}
	}
</script>