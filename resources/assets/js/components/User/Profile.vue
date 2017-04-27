<template>
	<div class="profile-component">
		
		<h1 class="user-component-title">Min Profil</h1>
		
		<form @keydown="profile.errors.clear()">
			<div class="row">
				<div class="col-xs-12 col-md-7">
					<div class="form-group" :class="{'has-error': profile.errors.has('name')}">
						<label class="control-label">Namn</label>
						<input type="text" class="form-control" v-model="profile.name">
						<span class="help-block" v-if="profile.errors.has('name')" v-text="profile.errors.get('name')"></span>
						<small>Namnet som visas på din publika profil.</small>
					</div>

					<div class="form-group" :class="{'has-error': profile.errors.has('username')}">
						<label class="control-label">Användarnamn</label>
						<input type="text" class="form-control" v-model="profile.username">
						<span class="help-block" v-if="profile.errors.has('username')" v-text="profile.errors.get('username')"></span>
						<small>Ditt unika namn</small>
					</div>

					<div class="form-group" :class="{'has-error': profile.errors.has('bio')}">
						<label class="control-label">Profiltext</label>
						<textarea class="form-control" rows="4" v-model="profile.bio"></textarea>
						<span class="help-block" v-if="profile.errors.has('bio')" v-text="profile.errors.get('bio')"></span>
						<small>En beskrivning av dig själv eller ditt företag. Detta kommer att visas på din publika profil.</small>
					</div>

					<div class="form-group">
						<button 
							type="submit" 
							class="btn btn-primary full-width" 
							@click.prevent="updateProfile"
							:disabled="profileProcessing || this.profile.errors.any()"
						>
							Uppdatera din profil
							<span class="processing" v-if="profileProcessing">
								<i class="fa fa-spinner fa-pulse fa-fw"></i>
								<span class="sr-only">Loading...</span>
							</span>
						</button> 
					</div>
				</div>

				<div class="col-xs-12 col-md-5">
					Profile Picture
				</div>
			</div>
		</form>

		<h2 class="user-component-title subsection">Uppdatera ditt lösenord</h2>

		<form>
			<div class="row">
				<div class="col-xs-12 col-md-7">
					<div class="form-group" :class="{'has-error': password.errors.has('old')}">
						<label class="control-label">Ditt gamla lösenord</label>
						<input type="text" class="form-control" v-model="password.old">
						<span class="help-block" v-if="password.errors.has('old')" v-text="password.errors.get('old')"></span>
					</div>

					<div class="form-group" :class="{'has-error': password.errors.has('new')}">
						<label class="control-label">Nytt lösenord</label>
						<input type="text" class="form-control" v-model="password.new">
						<span class="help-block" v-if="password.errors.has('new')" v-text="password.errors.get('new')"></span>
					</div>

					<div class="form-group" :class="{'has-error': password.errors.has('again')}">
						<label class="control-label">Repetera nytt lösenord</label>
						<input type="text" class="form-control" v-model="password.again">
						<span class="help-block" v-if="password.errors.has('again')" v-text="password.errors.get('again')"></span>
					</div>

					<div class="form-group">
						<button 
							type="submit" 
							class="btn btn-primary full-width" 
							@click.prevent="updatePassword"
							:disabled="passwordProcessing || this.password.errors.any()"
						>
							Uppdatera ditt lösenord
							<span class="processing" v-if="passwordProcessing">
								<i class="fa fa-spinner fa-pulse fa-fw"></i>
								<span class="sr-only">Loading...</span>
							</span>
						</button> 
					</div>
				</div>
			</div>
		</form>

	</div>
</template>

<script>
	import Form from '../../includes/classes/Form';
	import User from "../../includes/models/User";

	export default {
		data() {
			return {
				profile: new Form({
					name: this.$store.getters.authUser.name,
					username: this.$store.getters.authUser.username,
					bio: this.$store.getters.authUser.bio
				}),
				profileProcessing: false,
				password: new Form({
					old: '',
					new: '',
					again: ''
				}),
				passwordProcessing: false
			}
		},
		methods: {
			updateProfile() {
				this.profileProcessing = true;
				User.setResource('users/{id}/profile').update(this.$store.getters.authUser.id, this.profile.data())
					.then(response => {
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Nice! Du uppdaterade din profil.'});
						$("html, body").animate({ scrollTop: 0 }, "fast");
						this.$store.commit('SET_USER', {user: response.user});
						this.profileProcessing = false;
					})
					.catch(error => {
						this.profile.errors.record(error);
						this.profileProcessing = false;
					});
			}
		}
	}
</script>