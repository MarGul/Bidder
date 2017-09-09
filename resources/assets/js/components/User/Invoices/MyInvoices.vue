<template>
	<div class="my_invoices-component">
		
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Betalningar</h3>
			</header>
			<div class="white-contentSection-content">
				<template v-if="fetched">
					<ul class="user-items-list" v-if="invoices.length > 0">
						<li v-for="invoice in invoices">
							<span class="item-content">
								Faktura #{{ 1000000 + invoice.id }}
							</span>
							<span class="item-actions">
								<span class="payment-status" :class="paidClass(invoice)">
									<i class="fa" :class="paidIcon(invoice)" aria-hidden="true"></i>
									{{ paidText(invoice) }}
								</span>
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
		</section>

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
			paidClass(invoice) {
				return invoice.payments.length ? ['paid'] : ['not-paid'];
			},
			paidText(invoice) {
				return invoice.payments.length ? 'Betalad' : 'Ej betald';
			},
			paidIcon(invoice) {
				return invoice.payments.length ? ['fa-check-circle'] : ['fa-info-circle'];
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