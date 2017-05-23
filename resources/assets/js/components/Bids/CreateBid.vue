<template>
	<div class="create_bid-component">

		<div class="modal-header">
			<h3 class="text-center">Lägg ett bud</h3>
		</div>

		<div class="modal-body">
			<template v-if="$store.getters.isAuthenticated">
				<form @keydown="form.errors.clear()">
					
					<div class="row">
						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('start')}">
								<datepicker
									input-class="form-control" 
									placeholder="Starta utförandet*" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.start"
								></datepicker>

								<span class="help-block" v-if="form.errors.has('start')" v-text="form.errors.get('start')"></span>
							</div>
						</div>

						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('end')}">
								<datepicker
									input-class="form-control" 
									placeholder="Avsluta utförandet*" 
									language="sv"
									:monday-first="true"
									:disabled="{to: new Date()}"
									v-model="form.end"
								></datepicker>

								<span class="help-block" v-if="form.errors.has('end')" v-text="form.errors.get('end')"></span>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('hours')}">
								<input 
									type="text" 
									id="hours" 
									class="form-control" 
									placeholder="Antal timmar" 
									@keypress="isNumber($event)"
									v-model="form.hours">

								<span class="help-block" v-if="form.errors.has('hours')" v-text="form.errors.get('hours')"></span>
							</div>
						</div>
		
						<div class="col-xs-12 col-md-6">
							<div class="form-group" :class="{'has-error': form.errors.has('price')}">
								<input 
									type="text" 
									id="price" 
									class="form-control" 
									placeholder="Ditt pris*" 
									@keypress="isNumber($event)"
									v-model="form.price">

								<span class="help-block" v-if="form.errors.has('price')" v-text="form.errors.get('price')"></span>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-xs-12">
							<div class="form-group" :class="{'has-error': form.errors.has('description')}">
								<textarea 
									id="description" 
									rows="5" 
									class="form-control"
									placeholder="Beskrivning av utförandet*"
									v-model="form.description"
								></textarea>

								<span class="help-block" v-if="form.errors.has('description')" v-text="form.errors.get('description')"></span>
							</div>
						</div>
					</div>

					<div class="form-group">
						<button 
							type="submit" 
							class="btn btn-primary full-width" 
							@click.prevent="create"
							:disabled="processing || this.form.errors.any()"
						>
							Lägg ditt bud
							<span class="processing" v-if="processing">
								<i class="fa fa-spinner fa-pulse fa-fw"></i>
								<span class="sr-only">Loading...</span>
							</span>
						</button> 
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
					this.$store.commit('ADD_BID', {bid: response.bid});
					this.form.reset();
					this.processing = false;
				})
				.catch(error => {
					this.form.errors.record(error);
					this.processing = false;
				});
			},
			openShowBids() {
				this.$store.dispatch('openModal', { component: 'showBids', size: 'large' });
			}
		}
	}
</script>