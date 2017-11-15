<template>
	<div class="create_bid-component">

		<div class="modal-header">
			<h3>Lägg ett bud</h3>
			<div class="header-text">Berätta varför just du ska få utföra tjänsten.</div>
		</div>

		<div class="modal-body">
			<template v-if="$store.getters.isAuthenticated">
				<form @keydown="form.errors.clear()">
					
					<div class="row">
						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('start')}">
								<label class="control-label">Starta utförandet</label>
								<datepicker
									input-class="form-control" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.start"
								></datepicker>
								<span class="help-block" v-if="form.errors.has('start')" v-text="form.errors.get('start')"></span>
								<span class="help-block">När kan du påbörja utförandet av tjänsten?</span>
							</div>
						</div>

						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('end')}">
								<label class="control-label">Avsluta utförandet</label>
								<datepicker
									input-class="form-control" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.end"
								></datepicker>
								<span class="help-block" v-if="form.errors.has('end')" v-text="form.errors.get('end')"></span>
								<span class="help-block">När är du klar med tjänsten?</span>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('hours')}">
								<label for="hours" class="control-label">Antal timmar</label>
								<input 
									type="text"
									name="hours" 
									class="form-control" 
									@keypress="isNumber($event)"
									v-model="form.hours">
								<span class="help-block" v-if="form.errors.has('hours')" v-text="form.errors.get('hours')"></span>
								<span class="help-block">Hur många timmar kommer det att ta dig?</span>
							</div>
						</div>
		
						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('price')}">
								<label for="price" class="control-label">Ditt pris</label>
								<input 
									type="text" 
									name="price" 
									class="form-control" 
									@keypress="isNumber($event)"
									v-model="form.price">
								<span class="help-block" v-if="form.errors.has('price')" v-text="form.errors.get('price')"></span>
								<span class="help-block">Hur mycket tar du för att utföra tjänsten?</span>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12">
							<div class="form-group" :class="{'has-error': form.errors.has('description')}">
								<label for="description" class="control-label">Beskrivning av utförandet</label>
								<textarea 
									name="description" 
									rows="5" 
									class="form-control"
									v-model="form.description"
								></textarea>
								<span class="help-block" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
								<span class="help-block">Vad skiljer dig åt från dem andra?</span>
							</div>
						</div>
					</div>

					<div class="form-group">
						<button 
							type="submit" 
							class="btn btn-primary full-width" 
							:class="{'processing': processing}"
							@click.prevent="create"
							:disabled="processing || this.form.errors.any()"
						>Lägg ditt bud</button> 
					</div>

				</form>
			</template>
			<div class="alert alert-warning text-center" v-else>
				Du måste vara inloggad för att lägga ett bud. 
				<a class="link" @click.prevent="$store.dispatch('openModal', {component: 'login'})">Logga In</a> 
				eller <a class="link" @click.prevent="$store.dispatch('openModal', {component: 'register'})">Registrera</a>.
			</div>
		</div>

		<div class="modal-footer">
			<a class="link" @click.prevent="openShowBids">Se alla bud för denna tjänsten</a>
		</div>

	</div>
</template>

<script>
	import Model from '../../includes/Model';
	import Form from '../../includes/classes/Form';
	import Datepicker from 'vuejs-datepicker';

	export default {
		components: {
			datepicker: Datepicker
		},
		data() {
			return {
				processing: false,
				form: new Form({
					start: '',
					end: '',
					hours: '',
					price: '',
					description: ''
				})
			}
		},
		computed: {
			id() {
				return this.$store.getters.getService.id;
			},
			finalData() {
				let data = this.form.data();
				data.start = this.stripTime(data.start);
				data.end = this.stripTime(data.end);
				data.hours = parseFloat(data.hours.replace(',', '.'));
				data.price = parseFloat(data.price.replace(',', '.'));

				return data;
			}
		},
		methods: {
			isNumber(event) {
				let code = event.keyCode || event.which;
				if ( (code >= 48 && code <= 57) || code == 44 ) {
					return true;
				} else {
					event.preventDefault();
				}
			},
			stripTime(date) {
				return (date instanceof Date) ? `${date.getFullYear()}-${this.pad(date.getMonth() + 1)}-${this.pad(date.getDate())}` : date;
			},
			pad(number) {
				return ( number < 10 ) ? "0" + number : number;
			},
			create() {
				this.processing = true;

				new Model('services/{id}/bids').setId(this.id).create(this.finalData)
					.then(response => {
						// Add the new bid to the store.
						this.$store.dispatch('addBid', {bid: response.data.bid});
						this.form.reset();
						this.processing = false;
						// Show a success notification for bid created
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Snyggt! Vi skapade ditt bud.'});
						// Close the modal
						this.$store.dispatch('closeModal');
					})
					.catch(error => {
						this.form.errors.record(error);
						this.processing = false;
					});
			},
			openShowBids() {
				this.$store.dispatch('openModal', { component: 'showBids', size: 'size-large' });
			}
		}
	}
</script>