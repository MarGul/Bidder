<template>
	<div class="invoice_details-component">
		
		<template v-if="fetched">
			<div class="panel panel-success">
				<div class="panel-heading">
					<i class="fa fa-balance-scale" aria-hidden="true"></i> Faktura #{{ 1000000 + invoice.id }}
				</div>
				<div class="panel-body">
					<div class="invoice-text">Bla</div>
					<div class="invoice-details">
						<ul class="list-unstyled">
							<li><strong>Betald:</strong> {{ paid ? 'Ja' : 'Nej' }}</li>
							<li><strong>Skapad:</strong> {{ invoiceCreated }}</li>
							<li><strong>Förfallodag:</strong> {{ invoiceDue }}</li>
							<li><strong>Totalpris:</strong> {{ filters.currency(invoice.total) }}</li>
							<li><strong>Varav moms:</strong> {{ filters.currency(invoice.vat) }}</li>
							<li class="invoice-download">
								<a :href="`/download-invoice/${invoice.hash}`" target="_blank" class="btn btn-primary">Ladda ner faktura</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="alert alert-warning" v-if="!paid">
				Här ska payment iFrame finnas
			</div>
		</template>

		<app-loading v-else></app-loading>

	</div>
</template>

<script>
	export default {
		computed: {
			fetched() {
				return this.$store.getters.userInvoicesFetched;
			},
			invoice() {
				return this.$store.getters.userInvoiceFocus;
			},
			paid() {
				return this.invoice.payments.length > 0;
			},
			invoiceCreated() {
				return moment(this.invoice.created_at).format('LLL');
			},
			invoiceDue() {
				return moment(this.invoice.due).format('D MMMM YYYY');
			}
		},
		methods: {

		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserInvoices', {focusId: (this.$route.params.id - 1000000)})
			}
		}
	}
</script>