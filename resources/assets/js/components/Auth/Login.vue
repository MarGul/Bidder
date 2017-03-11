<template>
	<div class="login-component">
		
		<div class="modal-header">
			<h3 class="text-center">Logga In</h3>
		</div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">
				
				<div 
					class="alert alert-danger" 
					v-if="form.errors.has('invalid_credentials')" 
					v-text="form.errors.get('invalid_credentials')">
				</div>

				<div class="form-group" :class="{'has-error': form.errors.has('email')}">
					<input 
						type="email" 
						id="email" 
						class="form-control" 
						placeholder="Email" v-model="form.email">

					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="form-group"  :class="{'has-error': form.errors.has('password')}">
					<input 
						type="password" 
						id="password" 
						class="form-control" 
						placeholder="Lösenord" 
						v-model="form.password">

					<span class="help-block" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
				</div>

				<div class="form-group">
					<button 
						type="submit" 
						class="btn btn-primary full-width" 
						@click.prevent="authenticate"
						:disabled="processing || this.form.errors.any()"
					>
						Logga In
						<span class="processing" v-if="processing">
							<i class="fa fa-spinner fa-pulse fa-fw"></i>
							<span class="sr-only">Loading...</span>
						</span>
					</button> 
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

	export default {
		data() {
			return {
				processing: false,
				form: new Form({
					email: '',
					password: ''
				})
			}
		},
		methods: {
			authenticate() {
				this.processing = true;
				axios.post('auth', this.form.data())
					.then((response) => {
						console.log(response);
					})
					.catch((error) => {
						let err = (error.response.status === 401) ? {invalid_credentials: ['Ogiltiga Uppgifter']} : error.response.data;
						this.form.errors.record(err);
						this.processing = false;
					});
			}
		}
	}
</script>