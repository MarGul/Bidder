<template>
	<div class="account-component">			
		<section class="white-contentSection">
			<header class="white-contentSection-header">
				<h3>Min profil</h3>
			</header>
			<form @keydown="form.errors.clear()">
				<div class="white-contentSection-content">
					<div class="form-section-controls">
						<div class="control-container full-width" :class="{'has-errors': form.errors.has('name')}">
							<label class="control-label">Namn</label>
							<input type="text" class="form-control" v-model="form.name">
							<span class="help-block" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
						</div>
					</div>

					<div class="form-section-controls">
						<div class="control-container full-width" :class="{'has-errors': form.errors.has('username')}">
							<label class="control-label">Användarnamn</label>
							<input type="text" class="form-control" v-model="form.username">
							<span class="help-block" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>
						</div>
					</div>

					<div class="form-section-controls">
						<div class="control-container full-width">
							<label class="control-label">Email</label>
							<app-email-verified />
						</div>
					</div>

					<div class="form-section-controls">
						<div class="control-container full-width" :class="{'has-errors': form.errors.has('bio')}">
							<label class="control-label">Profiltext</label>
							<textarea rows="4" class="form-control" v-model="form.bio"></textarea>
							<span class="help-block" v-if="form.errors.has('bio')" v-text="form.errors.get('bio')"></span>
							<small>En beskrivning av dig själv eller ditt företag. Detta kommer att visas på din publika profil.</small>
						</div>
					</div>

				</div>

				<footer class="white-contentSection-footer">
					<button 
						type="submit" 
						class="btn btn-primary" 
						:class="{processing}" 
						@click.prevent="update" 
						:disabled="processing || this.form.errors.any()">
						Uppdatera
					</button>
				</footer>

			</form>
		</section>
	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/Model";
	import appEmailVerified from './EmailVerified';

	export default {
		components: {
			appEmailVerified
		},
		data() {
			return {
				form: new Form({
					name: this.$store.getters.authUser.name,
					username: this.$store.getters.authUser.username,
					bio: this.$store.getters.authUser.bio
				}),
				processing: false,
			}
		},
		methods: {
			update() {
				this.processing = true;
				new Model(`users/${this.$store.getters.authUser.id}/profile`).patch(this.form.data())
					.then(response => {
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Nice! Du uppdaterade din profil.'});
						this.$store.commit('SET_USER', {user: response.data.user});
						this.processing = false;
					})
					.catch(error => {
						this.form.errors.record(error.errors);
						this.processing = false;
					});
			}
		}
	}
</script>