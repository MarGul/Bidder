<template>
	<div class="register-component">

		<div class="modal-header">
			<h3>Registrera</h3>
			<div class="header-text">Tar 60 sekunder och är helt gratis!</div>
		</div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">

				<div class="form-group has-feedback" :class="{'has-error': form.errors.has('username')}">
					<label for="name" class="control-label">Användarnamn</label>
					<input type="text" name="username" class="form-control" placeholder="Välj användarnamn" v-model="form.username">
					<i class="fa fa-user-circle form-control-feedback"></i>
					<span class="help-block" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>
				</div>

				<div class="form-group has-feedback" :class="{'has-error': form.errors.has('email')}">
					<label for="email" class="control-label">Email</label>
					<input type="email" name="email" class="form-control" placeholder="Din emailadress" v-model="form.email">
					<i class="fa fa-envelope form-control-feedback"></i>
					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="form-group has-feedback"  :class="{'has-error': form.errors.has('password')}">
					<label for="password" class="control-label">Lösenord</label>
					<input type="password" name="password" class="form-control" placeholder="Skapa lösenord" v-model="form.password">
					<i class="fa fa-key form-control-feedback"></i>
					<span class="help-block" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
					<span class="help-block">Minst en bokstav, ett nummer, och 7 tecken.</span>
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
			Är du redan registrad? <a class="is-link" @click="$store.dispatch('openModal', {component: 'login'})">Logga In</a>
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
					username: '',
					email: '',
					password: ''
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