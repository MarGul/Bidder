<template>
	<div class="create_bid-component">

		<div class="modal-header">
			<h3 class="text-center">Lägg ett bud</h3>
		</div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">
				
				<div class="row">
					<div class="col-xs-12 col-md-6">
						<div class="form-group" :class="{'has-error': form.errors.has('start')}">
							<datepicker
								input-class="form-control" 
								placeholder="Starta utförandet" 
								language="sv"
								:monday-first="true"
								:disabled="{to: new Date()}"
								v-model="form.start"
							></datepicker>

							<span class="help-block" v-if="form.errors.has('start')" v-text="form.errors.get('start')"></span>
						</div>
					</div>

					<div class="col-xs-12 col-md-6">
						<div class="form-group" :class="{'has-error': form.errors.has('stop')}">
							<datepicker
								input-class="form-control" 
								placeholder="Avsluta utförandet" 
								language="sv"
								:monday-first="true"
								:disabled="{to: new Date()}"
								v-model="form.stop"
							></datepicker>

							<span class="help-block" v-if="form.errors.has('stop')" v-text="form.errors.get('stop')"></span>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-12 col-md-6">
						<div class="form-group"  :class="{'has-error': form.errors.has('hours')}">
							<input 
								type="number" 
								id="hours" 
								class="form-control" 
								placeholder="Antal timmar" 
								v-model.number="form.hours">

							<span class="help-block" v-if="form.errors.has('hours')" v-text="form.errors.get('hours')"></span>
						</div>
					</div>
	
					<div class="col-xs-12 col-md-6">
						<div class="form-group"  :class="{'has-error': form.errors.has('price')}">
							<input 
								type="text" 
								id="price" 
								class="form-control" 
								placeholder="Ditt pris" 
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
								placeholder="Beskrivning av utförandet"
							></textarea>
						</div>
					</div>
				</div>

				<div class="form-group">
					<button 
						type="submit" 
						class="btn btn-primary full-width" 
						@click.prevent="register"
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
		</div>

		<div class="modal-footer">
			<a class="link">Se alla bud för denna tjänsten</a>
		</div>

	</div>
</template>

<script>
	import User from '../../includes/models/User';
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
					stop: '',
					hours: '',
					price: '',
					description: ''
				})
			}
		},
		methods: {
			
		}
	}
</script>