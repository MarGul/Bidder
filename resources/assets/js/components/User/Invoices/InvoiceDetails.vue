<template>
	<div class="invoice_details-component">
		
		<div class="panel panel-success" v-if="fetched">
			<div class="panel-heading">
				<i class="fa fa-balance-scale" aria-hidden="true"></i> Faktura #{{ 1000000 + invoice.id }}
			</div>
			<div class="panel-body">

			</div>
		</div>

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
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserInvoices', {focusId: (this.$route.params.id - 1000000)})
			}
		}
	}
</script>