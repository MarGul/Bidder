<template>
	<div class="my_invoices-component">
		
		<h1 class="user-component-title">Betalningar</h1>

		<template v-if="fetched">
			<ul class="user-items-list" v-if="invoices.length > 0">
				<li v-for="invoice in invoices">
					<span class="item-content">
						<h5>Faktura #{{ 1000000 + invoice.id }}</h5>
						<div class="item-content-details">
							<span class="mr5">{{ paidText(invoice) }}</span>&bull;
							<span class="ml5 mr5">Beloppet är {{ filters.currency(invoice.total) }}</span>&bull;
							<span class="ml5">Förfaller den {{ dueDate(invoice) }}</span>
						</div>
					</span>
					<span class="item-actions">
						<button type="button" class="btn btn-primary" @click.prevent="show(invoice)">Visa detaljer</button>
					</span>
				</li>
			</ul>

			<div class="alert alert-info" v-else>
				Där finns inga betalningar registrerade på dig.
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
			invoices() {
				return this.$store.getters.userInvoices;
			}
		},
		methods: {
			paidText(invoice) {
				return invoice.payments.length ? 'Betalad' : 'Ej betald';
			},
			dueDate(invoice) {
				return moment(invoice.due).format('LL');
			},
			show(invoice) {
				this.$store.commit('SET_INVOICE_FOCUS', {invoice});
				this.$router.push(`/user/invoices/${1000000 + invoice.id}`);
			}
		},
		created() {
			if ( !this.fetched ) {
				this.$store.dispatch('fetchUserInvoices');
			}
		}
	}
</script>

<style lang="scss">
	.payment-status {
		margin-right: 10px;
		font-size: 12px;

		i {
			margin-right: 3px;
		}
		
		&.paid {
			color: #5cb85c;
		}

		&.not-paid {
			color: #d9534f;
		}
	}
</style>