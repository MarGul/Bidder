<template>
	<div class="login-component">
		
		<div class="modal-header">
			<h3>Logga In</h3>
			<div class="header-text">Välkommen in i värmen.</div>
		</div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">
				
				<div 
					class="alert alert-danger" 
					v-if="form.errors.has('invalid_login')" 
					v-text="form.errors.getValue('invalid_login')">
				</div>

				<div class="form-group has-feedback" :class="{'has-error': form.errors.has('email')}">
					<label for="email" class="control-label">Email</label>
					<input type="email" name="email" class="form-control" v-model="form.email">
					<i class="fa fa-envelope form-control-feedback"></i>
					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="form-group has-feedback"  :class="{'has-error': form.errors.has('password')}">
					<label for="password" class="control-label">Lösenord</label>
					<a 
						class="is-link is-weight-500 pull-right" 
						@click.prevent="$store.dispatch('openModal', {component: 'passwordReset'})"
						v-text="`Glömt lösenordet?`"
					/>
					<input type="password" name="password" class="form-control" v-model="form.password">
					<i class="fa fa-key form-control-feedback"></i>
					<span class="help-block" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
				</div>

				<input-checkbox
					text="Kom ihåg mig"
					v-model="form.remember"
				/>

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
			Har du inte ett konto än? <a class="is-link" @click="$store.dispatch('openModal', {component: 'register'})">Registrera</a>
		</div>

	</div>
</template>

<script>
	import Form from '../../includes/classes/Form';
	import inputCheckbox from '../InputControls/Checkbox';
	import Model from '../../includes/Model';

	export default {
		components: {
			inputCheckbox
		},
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
		methods: {
			authenticate() {
				this.processing = true;

				new Model('login').new().post(this.form.data())
					.then((response) => {
						this.$store.commit('SET_AUTHENTICATED', response.authenticated);
						this.$store.commit('SET_AUTHENTICATED_USER', response.user);
						
						if ( this.$store.getters.authIntended ) {
							this.$router.push(this.$store.getters.authIntended);
							this.$store.commit('SET_AUTHENTICATED_INTENDED', null);
						}

						this.processing = false;
						this.$store.dispatch('closeModal');
					})
					.catch((error) => {
						this.form.errors.record(error.errors);
						this.processing = false;
					});
			}
		}
	}
</script>