<template>
	<div class="register-component">

		<div class="modal-header">
			<h3>Registrera</h3>
			<div class="header-text">Tar 60 sekunder och är helt gratis!</div>
		</div>

		<div class="modal-body">
			<form @keydown="form.errors.clear()">

				<div class="control-container">
					<label class="control-label">Jag är en</label>
					<div class="is-flex">
						<label class="radio-btn flex-1">
							<div class="is-flex c_c">
								<input type="radio" class="mt0 mr5" :value="false" v-model="form.company"> Privatperson
							</div>
						</label>
						
						<label class="radio-btn flex-1">
							<div class="is-flex c_c">
								<input type="radio" class="mt0 mr5" :value="true" v-model="form.company"> Företagare
							</div>
						</label>
					</div>
				</div>

				<div class="control-container" :class="{'has-errors': form.errors.has('username')}">
					<label class="control-label">Användarnamn</label>
					<input type="text" class="form-control" placeholder="Välj användarnamn" v-model="form.username">
					<span class="help-block" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>
				</div>

				<div class="control-container" :class="{'has-errors': form.errors.has('email')}">
					<label class="control-label">Email</label>
					<input type="email" class="form-control" placeholder="Din emailadress" v-model="form.email">
					<span class="help-block" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
				</div>

				<div class="control-container"  :class="{'has-errors': form.errors.has('password')}">
					<label class="control-label">Lösenord</label>
					<input type="password" class="form-control" placeholder="Skapa lösenord" v-model="form.password">
					<span class="help-block" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
					<span class="help-block gray-sub-text">Minst en bokstav, ett nummer, och 7 tecken.</span>
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
			Är du redan registrad? <a class="is-link" @click="$store.dispatch('openModal', {component: 'login', data: {closeClass: 'white'}})">Logga In</a>
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
					password: '',
					company: false
				})
			}
		},
		methods: {
			register() {
				this.processing = true;

				let userType = this.form.company ? 'Company User' : 'Person User';
				// Send the register submission request to GA
				this.$ga.event('Login and Signup', 'Signup Submit', 'Onsite', {
					nonInteraction: false,
					dimension2: userType,
					metric3: 1
				});

				new Model('register').new().post(this.form.data())
					.then(response => {
						this.$store.commit('SET_AUTHENTICATED',  true);
						this.$store.commit('SET_AUTHENTICATED_USER', response.user);
						
						// Send the successful registration to GA
						this.$ga.event('Login and Signup', 'Signup Success', 'Onsite', {
							nonInteraction: false,
							dimension1: response.user.id,
							dimension2: userType,
							metric1: 1
						});
					
						this.$store.dispatch('closeModal');
						this.$router.push('/welcome');
					})
					.catch((error) => {
						// Send the failed attempt to GA
						this.$ga.event('Login and Signup', 'Signup Fail', `Onsite :${JSON.stringify(error.errors)}`, {
							nonInteraction: false,
							dimension2: userType,
							metric2: 1
						});

						this.form.errors.record(error.errors);
						this.processing = false;
					});
			}
		}
	}
</script>