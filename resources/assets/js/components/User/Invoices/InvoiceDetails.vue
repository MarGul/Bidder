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
							<p>Tack så mycket för att du har använt GoBid!</p>
							<p>
								Du kan betala fakturan direkt med kort. Vi använder oss av Stripe som behandlar flera miljarder kronor
								i betalningar om året runt om i hela världen. Betalningen sker säkert och inga av dina uppgifter behandlas av oss,
								allt behandlas via Stripe. Stripe kommer också att skicka ett seperat kvitto till dig för din betalning.
							</p>
							<p>
								Om du inte vill betala med kort så kan du be oss att skicka en faktura till dig. På fakturan så skickar vi med
								vårt bankgironummer så att du kan göra en insättning.
							</p>
							<p>
								Du kan ladda ner kvitto genom att klicka på knappen "Ladda ner kvitto". 
							</p>
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
										<i class="icon h_users light-gray wh20 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>För projekt</div>
										<div class="gray-sub-text" v-text="projectTitle"></div>
									</div>
								</li>
								<li>
									<div class="item-list-icon pt3">
										<i class="icon h_clock light-gray wh20 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>Skapad</div>
										<div class="gray-sub-text" v-text="filters.time(invoice.created_at)"></div>
									</div>
								</li>
								<li>
									<div class="item-list-icon">
										<i class="icon h_payment light-gray wh20 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>{{ paymentTitle }}</div>
										<div class="gray-sub-text">{{ paymentDate }}</div>
									</div>
								</li>
							</ul>
							<a class="btn btn-success full-width is-flex c_c" :href="`/download-invoice/${invoice.hash}`" target="_blank" rel="noopener noreferrer">
								<i class="icon h_download white wh20 mr10"></i> Ladda ner kvitto
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
				return this.invoice.payment ? moment(this.invoice.payment.created_at).format('D MMM YYYY HH:mm') : moment(this.invoice.due).format('LL');
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