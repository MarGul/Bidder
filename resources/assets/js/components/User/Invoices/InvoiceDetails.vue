<template>
	<div class="invoice_details-component">
		
		<template v-if="fetched">
			
			<div class="main-area-with-sidebar">
				<div class="main-area">
					<section class="white-contentSection">
						<header class="white-contentSection-header">
							<h3>Faktura #{{ invoice.id }}</h3>
						</header>
						<div class="white-contentSection-content">
							Här ska det stå lite om hur man betalar osv
						</div>
						<footer class="white-contentSection-footer">
							<div class="invoice-totals-container">
								<div class="totals-section">
									<div class="totals-header">Totalsumma</div>
									<div class="totals-value" v-text="filters.currency(invoice.total)"></div>
								</div>
							</div>
							<div class="invoice-totals-container">
								<div class="totals-section">
									<div class="totals-header">Varav moms</div>
									<div class="totals-value" v-text="filters.currency(invoice.vat)"></div>
								</div>
							</div>
						</footer>
					</section>

					<app-payment :invoice="invoice" />

				</div>
				<div class="main-area-sidebar">
					<section class="transparent-contentSection">
						<header class="transparent-contentSection-header">
							<h3>Detaljer</h3>
						</header>
						<div class="transparent-contentSection-content">
							<ul class="items-list-icon">
								<li>
									<div class="item-list-icon pt3">
										<i class="icon icon_two_users light-gray wh15 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>För projekt</div>
										<div class="gray-sub-text" v-text="projectTitle"></div>
									</div>
								</li>
								<li>
									<div class="item-list-icon pt3">
										<i class="icon icon_clock light-gray wh15 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>Skapad</div>
										<div class="gray-sub-text" v-text="filters.time(invoice.created_at)"></div>
									</div>
								</li>
								<li>
									<div class="item-list-icon">
										<i class="icon icon_credit_card light-gray wh15 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>{{ paymentTitle }}</div>
										<div class="gray-sub-text">{{ paymentDate }}</div>
									</div>
								</li>
							</ul>
							<a class="btn btn-success full-width is-flex c_c" :href="`/download-invoice/${invoice.hash}`" target="_blank" rel="noopener noreferrer">
								<i class="icon icon_download wh20 mr10"></i> Ladda ner kvitto
							</a>
						</div>
					</section>
				</div>
			</div>
		</template>

		<app-loading v-else></app-loading>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import Model from '../../../includes/Model';
	import appPayment from './Payment';

	export default {
		components: {
			appPayment
		},
		computed: {
			...mapGetters({
				fetched: 'userInvoicesFetched',
				invoice: 'userInvoicesFocus',
				user: 'authUser'
			}),
			paymentTitle() {
				return this.invoice.payment ? 'Betalad' : 'Förfallodag';
			},
			paymentDate() {
				return this.invoice.payment ? '' : moment(this.invoice.due).format('LL');
			},
			projectTitle() {
				let me = this.invoice.project.users.find(u => u.id === this.user.id);

				if ( me ) {
					return me.pivot.title;
				}
			}
		},
		created() {
			if ( !this.fetched ) {
				new Model('invoices').get()
					.then(response => {
						this.$store.commit('SET_USER_INVOICES', response.data.invoices);
						this.$store.commit('SET_USER_INVOICES_FOCUS', this.$route.params.id);
						this.$store.commit('SET_USER_INVOICES_FETCHED', true);
					})
					.catch(error => { console.log(error); });
			}
		}
	}
</script>