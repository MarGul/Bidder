<template>
	<div class="login-component">
		
		<div class="modal-header">
			<h3>Återställ ditt lösenord</h3>
		</div>

		<div class="modal-body">

			<div class="alert alert-success" v-if="success">
				Vi har skickat ett email till dig med en länk för att återställa ditt lösenord.
			</div>

			<form @keydown="form.errors.clear()" v-else>

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
			<a @click.prevent="$store.dispatch('openModal', {component: 'login'})">Logga In</a> eller <a @click.prevent="$store.dispatch('openModal', {component: 'register'})">Registrera</a>
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
				success: false,
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
						this.success = true;
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error);
						this.processing = false;
					});
			}
		}
	}
</script>