<template>
	<div class="register-component">

		<div class="modal-header">
			<h3 class="text-center">Registrera. Det är helt gratis</h3>
		</div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">
				
				<div class="form-group" :class="{'has-error': form.errors.has('name')}">
					<input 
						type="text" 
						id="name" 
						class="form-control" 
						placeholder="Namn" v-model="form.name">

					<span class="help-block" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
				</div>

				<div class="form-group" :class="{'has-error': form.errors.has('email')}">
					<input 
						type="email" 
						id="email" 
						class="form-control" 
						placeholder="Email" 
						v-model="form.email">

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
						@click.prevent="register"
						:disabled="processing || this.form.errors.any()"
					>
						Registrera
						<span class="processing" v-if="processing">
							<i class="fa fa-spinner fa-pulse fa-fw"></i>
							<span class="sr-only">Loading...</span>
						</span>
					</button> 
				</div>

			</form>
		</div>

		<div class="modal-footer">
			Är du redan registrad? <a @click="$store.dispatch('openModal', {component: 'login'})">Logga In</a>
		</div>

	</div>
</template>

<script>
	import User from '../../includes/models/User';
	import Form from '../../includes/classes/Form';

	export default {
		data() {
			return {
				processing: false,
				form: new Form({
					name: '',
					email: '',
					password: ''
				})
			}
		},
		methods: {
			register() {
				this.processing = true;
				User.create(this.form.data())
					.then((response) => {

					})
					.catch((error) => {
						this.form.errors.record(error);
						this.processing = false;
					});
			}
		}
	}
</script>