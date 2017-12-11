<template>
	<div class="payment_component">
		<section class="white-contentSection mt30">
			<header class="white-contentSection-header">
				<h3>Betalning</h3>
			</header>
			<div class="white-contentSection-content">
				<div class="payment-methods-container">
					<div class="payment-method payment-method-invoice" :class="{selected: selectedMethod === 'invoice' }" @click="selectedMethod = 'invoice'">
						<div class="payment-select">
							<i class="icon wh20 light-gray payment-checked-icon"></i>
						</div>
						<div class="payment-content">
							<div class="payment-icon-invoice"></div>
							<div class="payment-heading">Betala med faktura</div>
						</div>
					</div>
					<div class="payment-method payment-methods-card" :class="{selected: selectedMethod === 'creditcard' }" @click="selectedMethod = 'creditcard'">
						<div class="payment-select">
							<i class="icon wh20 light-gray payment-checked-icon"></i>
						</div>
						<div class="payment-content">
							<div class="payment-icon-cc"></div>
							<div class="payment-heading">Betala med kort</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectedMethod: 'invoice'
			}
		}
	}
</script>