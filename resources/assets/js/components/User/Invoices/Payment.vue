<template>
	<div class="payment_component">
		<section class="white-contentSection mt30">
			<header class="white-contentSection-header">
				<h3>Betalning</h3>
			</header>
			<div class="white-contentSection-content">
				
				<div class="alert alert-info mb0 text-left" v-if="invoice.payment">
					Din betalning är mottagen.
					<div class="is-small-text mt10">
						<strong>Mottogs den:</strong> {{ filters.time(invoice.payment.created_at) }} <br>
						<strong>Betalningsmetod:</strong> {{ invoice.payment.payment_method === 'stripe' ? 'Kort' : 'Faktura' }} <br>
					</div>
				</div>
				
				<template v-else>
					<div class="payment-methods-container">
						<div class="payment-methods payment-methods-card" 
							:class="{selected: selectedMethod === 'creditcard'}" 
							@click="selectedMethod = 'creditcard'">
							<div class="payment-select">
								<i 
									class="icon wh20 light-gray"
									:class="{
										'payment-checked-icon': selectedMethod === 'creditcard', 
										'payment-unchecked-icon': selectedMethod !== 'creditcard'
									}"
								></i>
							</div>
							<div class="payment-content">
								<div class="payment-icon-cc"></div>
								<div class="payment-heading">Betala med kort</div>
							</div>
						</div>
						<div class="payment-methods payment-method-invoice" 
							:class="{selected: selectedMethod === 'invoice'}" 
							@click="selectedMethod = 'invoice'">
							<div class="payment-select">
								<i 
									class="icon wh20 light-gray"
									:class="{
										'payment-checked-icon': selectedMethod === 'invoice', 
										'payment-unchecked-icon': selectedMethod !== 'invoice'
									}"
								></i>
							</div>
							<div class="payment-content">
								<div class="payment-icon-invoice"></div>
								<div class="payment-heading">Betala via bankgiro</div>
							</div>
						</div>
					</div>

					<component :is="activePaymentMethod" :invoiceId="invoice.id" :amount="invoice.total" />
				</template>

			</div>
		</section>
	</div>
</template>

<script>
	import paymentMethodInvoice from './PaymentMethodInvoice';
	import paymentMethodCreditCard from './PaymentMethodCreditCard';

	export default {
		components: {
			paymentMethodInvoice,
			paymentMethodCreditCard
		},
		props: {
			invoice: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				selectedMethod: 'creditcard'
			}
		},
		computed: {
			activePaymentMethod() {
				return this.selectedMethod === 'invoice' ? 'paymentMethodInvoice' : 'paymentMethodCreditCard';
			}
		}
	}
</script>