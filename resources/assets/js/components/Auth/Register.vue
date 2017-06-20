<template>
	<div class="register-component">

		<div class="modal-header">
			<h3 class="text-center">Registrera. Det är helt gratis</h3>
		</div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">

				<div class="form-group" :class="{'has-error': form.errors.has('name')}">
					<label for="name" class="control-label">Namn</label>
					<input type="text" name="name" class="form-control" v-model="form.name">
					<span class="help-block" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
				</div>

				<div class="form-group" :class="{'has-error': form.errors.has('email')}">
					<label for="email" class="control-label">Email</label>
					<input type="email" name="email" class="form-control" v-model="form.email">
					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="form-group"  :class="{'has-error': form.errors.has('password')}">
					<label for="password" class="control-label">Lösenord</label>
					<input type="password" name="password" class="form-control" v-model="form.password">
					<span class="help-block" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
				</div>

				<div class="form-group"  :class="{'has-error': form.errors.has('password_confirmation')}">
					<label for="password_confirmation" class="control-label">Bekräfta lösenordet</label>
					<input type="password" name="password_confirmation" class="form-control" v-model="form.password_confirmation">
					<span class="help-block" v-if="form.errors.has('password_confirmation')" v-text="form.errors.get('password_confirmation')"></span>
				</div>

				<div class="form-group">
					<button 
						class="btn btn-primary full-width" 
						:class="{'processing': processing}"
						@click.prevent="register"
						:disabled="processing || this.form.errors.any()"
					>Registrera</button> 
				</div>

			</form>
		</div>

		<div class="modal-footer">
			Är du redan registrad? <a @click="$store.dispatch('openModal', {component: 'login'})">Logga In</a>
		</div>

	</div>
</template>

<script>
	import Model from '../../includes/Model';
	import Form from '../../includes/classes/Form';

	export default {
		data() {
			return {
				processing: false,
				form: new Form({
					name: '',
					email: '',
					password: '',
					password_confirmation: ''
				})
			}
		},
		methods: {
			register() {
				this.processing = true;
				new Model('register').new().post(this.form.data())
					.then(response => {
						this.$store.commit('SET_AUTHENTICATED', {authenticated: true});
						this.$store.commit('SET_USER', {user: response.user});
						this.$store.dispatch('closeModal');
						this.$router.push('/welcome');
					})
					.catch((error) => {
						this.form.errors.record(error);
						this.processing = false;
					});
			}
		}
	}
</script>