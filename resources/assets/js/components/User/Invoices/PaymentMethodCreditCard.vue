<template>
	<div class="payment_method_credit_card-component">
		<div class="payment-method-container arrow-right">
			
			<div class="payment-method-description">
				<div class="payment-method-description-content">
					<h4>Betala med kort via Stripe</h4>
					<p>
						Stripe behandlar flera miljarder i betalningar varje år runt om hela världen. Du komminucerar direkt med Stripe via en säker
						anslutning. Dina uppgifter blir aldrig behandlade av oss.
					</p>
				</div>
				<div class="payment-method-description-image">
					<a href="https://stripe.com/about" target="_blank" rel="noopener">
						<img src="/images/powered_by_stripe.png" alt="Stripe logo" class="img-responsive">
					</a>
					<div class="gray-sub-text is-extra-small-text text-center"><em>Klicka för mer info</em></div>
					<div class="is-flex c_c mt10">
						<i class="icon icon_lock wh12 mr5"></i> <span class="gray-sub-text is-extra-small-text">SSL/TLS anslutning</span>
					</div>
				</div>
			</div>

			<button 
				type="button" 
				class="btn btn-primary mt10" 
				:class="{processing: processing}"
				:disabled="processing"
				@click="checkout"
				v-text="'Slutför betalningen'"
			/>

		</div>
	</div>
</template>

<script>
	export default {
		props: {
			amount: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				processing: true
			}
		},
		computed: {
			totalInCents() {
				return this.amount * 100;
			},
			email() {
				//return this.$store.getters.authUser.email;
			}
		},
		methods: {
			checkout() {
				this.handler.open({
					name: 'GoBid AB',
					description: 'Genomför en testbetalning',
					amount: this.totalInCents,
					allowRememberMe: false,
					currency: 'sek',
					email: 'mackan@mack.com',
					token: (token) => {
						this.processing = true;
						console.log(token);
					}
				});
			}
		},
		created() {
			let stripe = document.createElement('script');
			stripe.src = 'https://checkout.stripe.com/checkout.js';
			stripe.type = 'text/javascript';
			document.head.appendChild(stripe);

			stripe.onload = () => {
				this.handler = StripeCheckout.configure({
					key: 'pk_test_yXsbQM0R6fq2kdNKGqhtkhCP',
					locale: 'auto'
				});
				this.processing = false;
			}
		}
	}
</script>