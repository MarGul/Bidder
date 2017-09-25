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
							bla
						</div>
					</section>
				</div>
				<div class="main-area-sidebar">
					<section class="transparent-contentSection">
						<header class="transparent-contentSection-header">
							<h3>Detaljer</h3>
						</header>
						<div class="transparent-contentSection-content">
							<ul class="items-list-icon">
								<li class="">
									<div class="item-list-icon pt3">
										<i class="icon icon_two_users wh15 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>För projektet</div>
										<div class="gray-sub-text" v-text="invoice.project.title"></div>
									</div>
								</li>
								<li class="">
									<div class="item-list-icon">
										<i class="icon icon_credit_card wh15 cursor-default"></i>
									</div>
									<div class="item-list-icon-content">
										<div>{{ paymentTitle }}</div>
										<div class="gray-sub-text">{{ paymentDate }}</div>
									</div>
								</li>
							</ul>
							<a class="btn btn-success full-width is-flex c_c" :href="`/download-invoice/${invoice.hash}`" target="_blank">
								<i class="icon icon_download wh20 mr10"></i> Ladda ner fakturan
							</a>
						</div>
					</section>
				</div>
			</div>

			<div class="alert alert-warning mt30">
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
			}),
			paymentTitle() {
				return this.invoice.payment ? 'Betalad' : 'Förfallodag';
			},
			paymentDate() {
				return this.invoice.payment ? '' : moment(this.invoice.due).format('LL');
			}
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