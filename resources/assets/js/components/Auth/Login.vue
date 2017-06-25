<template>
	<div class="login-component">
		
		<div class="modal-header">
			<h3 class="text-center">Logga In</h3>
		</div>

		<div class="modal-body">

			<div class="alert" :class="[alertType]" v-if="alertMessage" v-text="alertMessage"></div>

			<form @keydown="form.errors.clear()">
				
				<div 
					class="alert alert-danger" 
					v-if="form.errors.has('invalid_login')" 
					v-text="form.errors.getValue('invalid_login')">
				</div>

				<div class="form-group" :class="{'has-error': form.errors.has('email')}">
					<label for="email" class="control-label">Email</label>
					<input type="email" name="email" class="form-control" v-model="form.email">
					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="form-group"  :class="{'has-error': form.errors.has('password')}">
					<label for="password" class="control-label">Lösenord</label>
					<a class="link is-bold pull-right" @click.prevent="$store.dispatch('openModal', {component: 'passwordReset'})">Glömt lösenordet?</a>
					<input type="password" name="password" class="form-control" v-model="form.password">
					<span class="help-block" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
				</div>

				<div class="checkbox">
					<label>
						<input type="checkbox" v-model="form.remember"> Kom ihåg mig
					</label>
				</div>

				<div class="form-group">
					<button
						class="btn btn-primary full-width"
						:class="{'processing': processing}" 
						@click.prevent="authenticate"
						:disabled="processing || this.form.errors.any()"
					>Logga In</button> 
				</div>
			</form>
		</div>

		<div class="modal-footer">
			Har du inte ett konto än? <a @click="$store.dispatch('openModal', {component: 'register'})">Registrera</a>
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
					email: '',
					password: '',
					remember: false
				})
			}
		},
		computed: {
			alertType() {
				return `alert-${this.$store.getters.modalAlert}`;
			},
			alertMessage() {
				return this.$store.getters.modalMessage;
			}
		},
		methods: {
			authenticate() {
				this.processing = true;

				new Model().new().setUrl('login').post(this.form.data())
					.then((response) => {
						this.$store.commit('SET_AUTHENTICATED', {authenticated: response.authenticated});
						this.$store.commit('SET_USER', {user: response.user});
						
						if ( this.$store.getters.authIntended ) {
							this.$router.push(this.$store.getters.authIntended);
							this.$store.commit('SET_INTENDED', {intended: null});
						}

						this.processing = false;
						this.$store.dispatch('closeModal');
					})
					.catch((error) => {
						this.form.errors.record(error);
						this.processing = false;
					});
			}
		}
	}
</script>