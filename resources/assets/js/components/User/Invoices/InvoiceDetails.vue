<template>
	<div class="invoice_details-component">
		
		<template v-if="fetched">
			

			<div class="alert alert-warning">
				Här ska payment iFrame finnas
			</div>
		</template>

		<app-loading v-else></app-loading>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../../includes/Model';

	export default {
		computed: {
			...mapGetters({
				fetched: 'userInvoicesFetched',
				invoice: 'userInvoicesFocus'
			})
		},
		created() {
			if ( !this.fetched ) {
				new Model('invoices').get()
					.then(response => {
						this.$store.commit('SET_USER_INVOICES', response.invoices);
						this.$store.commit('SET_USER_INVOICES_FOCUS', this.$route.params.id);
						this.$store.commit('SET_USER_INVOICES_FETCHED', true);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>