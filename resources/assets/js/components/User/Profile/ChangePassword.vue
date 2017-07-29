<template>
	<div class="change_password-component">
		<form @keydown="form.errors.clear()">
			<div class="form-group" :class="{'has-error': form.errors.has('old')}">
				<label class="control-label">Ditt gamla lösenord</label>
				<input type="password" class="form-control" v-model="form.old">
				<span class="help-block" v-if="form.errors.has('old')" v-text="form.errors.get('old')"></span>
			</div>

			<div class="form-group" :class="{'has-error': form.errors.has('new')}">
				<label class="control-label">Nytt lösenord</label>
				<input type="password" class="form-control" v-model="form.new">
				<span class="help-block" v-if="form.errors.has('new')" v-text="form.errors.get('new')"></span>
			</div>

			<div class="form-group" :class="{'has-error': form.errors.has('again')}">
				<label class="control-label">Repetera nytt lösenord</label>
				<input type="password" class="form-control" v-model="form.again">
				<span class="help-block" v-if="form.errors.has('again')" v-text="form.errors.get('again')"></span>
			</div>

			<div class="form-group">
				<button 
					type="submit" 
					class="btn btn-primary full-width" 
					:class="{'processing': processing}"
					@click.prevent="update"
					:disabled="processing || this.form.errors.any()"
				>Uppdatera ditt lösenord</button> 
			</div>
		</form>
	</div>
</template>

<script>
	import Form from '../../../includes/classes/Form';
	import Model from "../../../includes/Model";

	export default {
		data() {
			return {
				form: new Form({
					old: '',
					new: '',
					again: ''
				}),
				processing: false
			}
		},
		methods: {
			update() {
				this.processing = true;
				new Model('users/{id}/password').update(this.$store.getters.authUser.id, this.form.data(), 'put')
					.then(response => {
						this.$store.dispatch('showNotification', {type: 'success', msg: 'Nice! Du uppdaterade ditt lösenord.'});
						this.form.reset();
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