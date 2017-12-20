<template>
	<div class="payment_component">
		<section class="white-contentSection mt30">
			<header class="white-contentSection-header">
				<h3>Betalning</h3>
			</header>
			<div class="white-contentSection-content">
				<div class="payment-methods-container">
					<div class="payment-methods payment-method-invoice" :class="{selected: selectedMethod === 'invoice'}" @click="selectedMethod = 'invoice'">
						<div class="payment-select">
							<i 
								class="icon wh20 light-gray"
								:class="{'payment-checked-icon': selectedMethod === 'invoice', 'payment-unchecked-icon': selectedMethod !== 'invoice'}"
							></i>
						</div>
						<div class="payment-content">
							<div class="payment-icon-invoice"></div>
							<div class="payment-heading">Betala med faktura</div>
						</div>
					</div>
					<div class="payment-methods payment-methods-card" :class="{selected: selectedMethod === 'creditcard'}" @click="selectedMethod = 'creditcard'">
						<div class="payment-select">
							<i 
								class="icon wh20 light-gray"
								:class="{'payment-checked-icon': selectedMethod === 'creditcard', 'payment-unchecked-icon': selectedMethod !== 'creditcard'}"
							></i>
						</div>
						<div class="payment-content">
							<div class="payment-icon-cc"></div>
							<div class="payment-heading">Betala med kort</div>
						</div>
					</div>
				</div>

				<component :is="activePaymentMethod" :amount="invoice.total" />
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
				selectedMethod: 'invoice'
			}
		},
		computed: {
			activePaymentMethod() {
				return this.selectedMethod === 'invoice' ? 'paymentMethodInvoice' : 'paymentMethodCreditCard';
			}
		}
	}
</script>