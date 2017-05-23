<template>
	<div class="account-component">			
		<form @keydown="form.errors.clear()">
			<div class="form-group" :class="{'has-error': form.errors.has('name')}">
				<label class="control-label">Namn</label>
				<input type="text" class="form-control" v-model="form.name">
				<span class="help-block" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
				<small>Namnet som visas på din publika profil.</small>
			</div>

			<div class="form-group" :class="{'has-error': form.errors.has('username')}">
				<label class="control-label">Användarnamn</label>
				<input type="text" class="form-control" v-model="form.username">
				<span class="help-block" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>
				<small>Ditt unika namn</small>
			</div>

			<div class="form-group" :class="{'has-error': form.errors.has('bio')}">
				<label class="control-label">Profiltext</label>
				<textarea class="form-control" rows="4" v-model="form.bio"></textarea>
				<span class="help-block" v-if="form.errors.has('bio')" v-text="form.errors.get('bio')"></span>
				<small>En beskrivning av dig själv eller ditt företag. Detta kommer att visas på din publika profil.</small>
			</div>

			<div class="form-group">
				<button 
					type="submit" 
					class="btn btn-primary full-width" 
					@click.prevent="update"
					:disabled="processing || this.form.errors.any()"
				>
					Uppdatera din profil
					<span class="processing" v-if="processing">
						<i class="fa fa-spinner fa-pulse fa-fw"></i>
						<span class="sr-only">Loading...</span>
					</span>
				</button> 
			</div>
		</form>
	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/models/Model";

	export default {
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
				new Model('users/{id}/profile').update(this.$store.getters.authUser.id, this.form.data())
					.then(response => {
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Nice! Du uppdaterade din profil.'});
						$("html, body").animate({ scrollTop: 0 }, "fast");
						this.$store.commit('SET_USER', {user: response.user});
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