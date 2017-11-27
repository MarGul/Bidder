<template>
	<div class="login-component">
		
		<div class="modal-header">
			<h3>Återställ ditt lösenord</h3>
			<div class="header-text">Glömt lösenordet? Ingen fara.</div>
		</div>

		<div class="modal-body">

			<form @keydown="form.errors.clear()">

				<div class="form-group" :class="{'has-error': form.errors.has('email')}">
					<label for="email" class="control-label">
						Ange din emailadress så skickar vi en länk där du kan återställa ditt lösenord.
					</label>
					<input type="email" name="email" placeholder="Din emailadress" class="form-control" v-model="form.email">
					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="form-group">
					<button
						class="btn btn-primary full-width"
						:class="{'processing': processing}" 
						@click.prevent="send"
						:disabled="processing || this.form.errors.any()"
					>Skicka lösenordsåterställning</button> 
				</div>
			</form>

		</div>

		<div class="modal-footer">
			<a class="is-link" @click.prevent="$store.dispatch('openModal', {component: 'login', data: {closeClass: 'white'}})">Logga In</a>
			 eller <a class="is-link" @click.prevent="$store.dispatch('openModal', {component: 'register', data: {closeClass: 'white'}})">Registrera</a>
		</div>

	</div>
</template>

<script>
	import Form from '../../includes/classes/Form';
	import Model from '../../includes/Model';

	export default {
		data() {
			return {
				processing: false,
				form: new Form({
					email: ''
				})
			}
		},
		methods: {
			send() {
				this.processing = true;
				new Model('password/email').new().post(this.form.data())
					.then(response => {
						this.form.email = '';
						this.processing = false;
						this.$store.dispatch('showNotification', {
							type: 'success', 
							msg: 'Vi har skickat ett email till dig med en länk för att återställa ditt lösenord.'
						});
						this.$store.dispatch('closeModal');
					})
					.catch(error => {
						this.form.errors.record(error.errors);
						this.processing = false;
					});
			}
		}
	}
</script>