<template>
	<div class="payment_method_credit_card-component">
		<div class="payment-method-container arrow-left">
			
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

			<div class="alert alert-danger mt10" v-if="error" v-text="errorMessage"></div>

			<button 
				type="button" 
				class="btn btn-primary mt10" 
				:class="{processing: processing}"
				:disabled="processing || !emailFetched"
				@click="checkout"
				v-text="'Slutför betalningen'"
			/>

		</div>
	</div>
</template>

<script>
	import Model from '../../../includes/Model';
	
	export default {
		props: {
			invoiceId: {
				type: Number,
				required: true
			},
			amount: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				email: '',
				emailFetched: false,
				error: false,
				errorMessage: '',
				processing: true
			}
		},
		computed: {
			totalInCents() {
				return this.amount * 100;
			}
		},
		methods: {
			checkout() {
				this.handler.open({
					name: 'GoBid AB',
					description: `Betalning för faktura #${this.invoiceId}`,
					amount: this.totalInCents,
					allowRememberMe: false,
					currency: 'sek',
					email: this.email,
					panelLabel: `Betala {{amount}}`,
					token: (token) => {
						this.processing = true;
						
						new Model(`payments/stripe`).post({invoice: this.invoiceId, token: token})
							.then(response => {
								let invoices = this.$store.getters.userInvoices;
								for ( let i = 0; i < invoices.length; i++) {
									if ( invoices[i].id === this.invoiceId ) {
										invoices[i].payment = response.data.payment;
									}
								}
								this.$store.commit('SET_USER_INVOICES', invoices);
								
								this.$store.dispatch('showNotification', {type: 'success', msg: 'Din betalning har blivit mottagen.'});
								this.error = false;
								this.errorMessage = false;
								this.processing = false;
							})
							.catch(error => {
								this.error = true;
								this.errorMessage = error.message;
								this.processing = false;
							});
					}
				});
			}
		},
		created() {
			// Fetch the users email.
			new Model(`users/${this.$store.getters.authUser.id}/email`).get()
				.then(response => {
					this.email = response.data.email;
					this.emailFetched = true;
				})
				.catch(error => {
					this.errorMessage = error.message;
				});
			
			let stripe = document.createElement('script');
			stripe.src = 'https://checkout.stripe.com/checkout.js';
			stripe.type = 'text/javascript';
			document.head.appendChild(stripe);

			stripe.onload = () => {
				this.handler = StripeCheckout.configure({
					key: 'pk_test_yXsbQM0R6fq2kdNKGqhtkhCP',
					locale: 'sv'
				});
				this.processing = false;
			}
		}
	}
</script>